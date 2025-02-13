import React, { useMemo, useState, useEffect } from 'react';
import * as Babel from '@babel/standalone';
import { render } from '@react-email/render';
import { Tailwind, Html, Head, Body, Container, Preview, Section, Img, Heading, Text, Link, Hr, Button } from '@react-email/components';
import type { Customer, Client } from '../App';

interface GeneratedEmailRendererProps {
  code: string;
  customer: Customer;
  client: Client;
  returnHTML?: boolean; // New prop to determine return type
}

const GeneratedEmailRenderer: React.FC<GeneratedEmailRendererProps> = ({ code, customer, client, returnHTML = false }) => {
  const [renderedHtml, setRenderedHtml] = useState<string>('');

  const EmailTemplate = useMemo(() => {
    if (!code) return null;
    try {
      const cleanCode = code
        .replace(/\\n/g, '\n')
        .replace(/\\"/g, '"')
        .replace(/export default /, '')
        .replace(/const EmailTemplate = /, '');

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
    const renderEmail = async () => {
      if (!EmailTemplate) {
        setRenderedHtml('<div>No generated email to preview.</div>');
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
