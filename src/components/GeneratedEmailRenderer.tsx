import React, { useMemo, useState, useEffect } from 'react';
import * as Babel from '@babel/standalone';
import { render } from '@react-email/render';
import { Tailwind, Html, Head, Body, Container, Preview, Section, Img, Heading, Text, Link, Hr, Button } from '@react-email/components';
import type { Customer, Client } from '../App';
import { cleanGeneratedCode } from '@/utils/cleanResponse';

interface GeneratedEmailRendererProps {
  code: string;
  customer: Customer;
  client: Client;
  returnHTML?: boolean;
  onHtmlRender?: (html: string) => void; // New prop
}

const GeneratedEmailRenderer: React.FC<GeneratedEmailRendererProps> = ({ code, customer, client, returnHTML = false, onHtmlRender }) => {
  const [renderedHtml, setRenderedHtml] = useState<string>('');

  const EmailTemplate = useMemo(() => {
    if (!code) return null;
    try {
      const cleanCode = cleanGeneratedCode(code);

      const transformed = Babel.transform(cleanCode, {
        presets: ['react'],
        filename: 'generated-email.js',
      }).code;

      if (!transformed) {
        throw new Error('Babel transformation failed.');
      }

      const scope = {
        React,
        Tailwind,
        Html,
        Head,
        Body,
        Container,
        Preview,
        Section,
        Img,
        Heading,
        Text,
        Link,
        Hr,
        Button,
      };

      const createComponent = new Function(...Object.keys(scope), `return ${transformed}`);

      return createComponent(...Object.values(scope));
    } catch (err) {
      console.error('Error rendering generated email:', err);
      return null;
    }
  }, [code]);

  useEffect(() => {
    if (onHtmlRender) {
      onHtmlRender(renderedHtml); // Send the rendered HTML to the parent
    }
  }, [renderedHtml, onHtmlRender]);

  useEffect(() => {
    const renderEmail = async () => {
      if (!EmailTemplate) {
        setRenderedHtml(
          '<div style="font-Family:monospace; color: gray; margin-top:3rem; text-align:center; width: 100%;">No generated email to preview.</div>'
        );
        return;
      }

      try {
        const emailElement = React.createElement(EmailTemplate, { customer, client });
        const html = await render(emailElement, {
          pretty: true,
        });

        setRenderedHtml(html);
      } catch (err) {
        console.error('Error rendering email:', err);
        setRenderedHtml(`<div>Error rendering email: ${String(err)}</div>`);
      }
    };

    renderEmail();
  }, [EmailTemplate, customer, client]);

  // Return either the HTML string or the iframe based on the prop
  return returnHTML ? renderedHtml : <iframe title='generated-email-preview' srcDoc={renderedHtml} className='bg-white h-full w-full' />;
};

export default GeneratedEmailRenderer;
