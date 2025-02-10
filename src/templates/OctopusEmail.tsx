import { Body, Button, Container, Head, Heading, Hr, Html, Img, Link, Preview, Section, Text, Tailwind } from '@react-email/components';

interface OctopusEmailProps {
  authorName: string;
  authorImage: string;
  reviewText: string;
}

const OctopusEmail = ({ authorName, authorImage, reviewText }: OctopusEmailProps) => {
  return (
    <Tailwind>
      <Html>
        <Head>
          <meta name='color-scheme' content='light' />
          <meta name='supported-color-schemes' content='light' />
        </Head>
        <Preview>Clear your debt, your way with Ophelos</Preview>
        <Body style={main} className='bg-[#F9EFE0] m-0'>
          <div className='bg-[#F9EFE0] sm:py-6'>
            <Container style={container} className='bg-white py-6 sm:rounded-lg w-lg'>
              <Section style={box}>
                <Img className='mb-8' src='https://connect.ophelos.com/assets/Ophelos_Intrum-01568c59.png' width='150' height='43' alt='Ophelos' />
                <Heading as='h1' className='text-3xl font-bold text-gray-900'>
                  Clear your debt, your way
                </Heading>
              </Section>
              <Section className='mb-6 -mt-8'>
                <Img
                  className='w-full h-full'
                  src='https://cdn.prod.website-files.com/66c89a35990c4fc98fdda0a7/67a64486f6b5ceb622979302_glow%20copy.png'
                  alt='ophelos-blob'
                  width='300'
                  height='250'
                />
              </Section>
              <Section style={box}>
                <Text style={paragraph}>Hi Paul,</Text>
                <Text style={paragraph}>
                  We're{' '}
                  <Link style={anchor} href='https://www.ophelos.com'>
                    Ophelos
                  </Link>{' '}
                  — here to help you clear your Energy debt with Octopus.
                </Text>
                <Text style={paragraph}>We want to help you find a solution that works on your terms and timescales.</Text>

                <Text style={paragraph}>
                  That's why we'll never ask you to pay back anything you can't afford. Your wellbeing and financial health are our top priority.
                </Text>

                <Text style={paragraph}>In your account you can:</Text>
                <ul style={paragraph}>
                  <li>See your debt balance. </li>
                  <li>View your options and discover how to pay</li>
                </ul>
              </Section>

              <Section style={codewrap}>
                <Section style={codebox}>
                  <Text className='m-0 text-center font-medium'>To access your account in copy this code:</Text>
                  <Text style={code}>ABCDEF</Text>
                  <Button style={button} href='https://connect.ophelos.com'>
                    View your account
                  </Button>
                  <Text className='mt-6 text-center font-medium'>You can aslo resolve this directly with Octopus here:</Text>
                  <Button style={buttonalt} href='https://octopus.energy/login/'>
                    Go to Octopus
                  </Button>
                </Section>
              </Section>

              <Section style={box}>
                <Text style={paragraph}>— The Ophelos Team</Text>
                <Hr style={hr} />
                <Text style={footer}>
                  We're authorised and regulated by the Financial Conduct Authority. You can check us out here or search the FCA register using our
                  reference number 935242. We're also a registered company in England and Wales. You can search for us on Companies House using our
                  company number 12185588
                </Text>
              </Section>
            </Container>
          </div>
        </Body>
      </Html>
    </Tailwind>
  );
};

const main = {
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  // backgroundColor: '#ffffff',
  // margin: '0 auto',
  // padding: '20px 0 48px',
  // marginBottom: '64px',
};

const box = {
  padding: '0 24px',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const paragraph = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left' as const,
};

const anchor = {
  color: '#161310',
  fontWeight: 'bold',
};

const codewrap = {
  padding: '0 12px',
  marginBottom: '24px',
};

const codebox = {
  background: 'rgb(245, 244, 245)',
  borderRadius: '10px',
  padding: '24px 16px',
};

const code = {
  color: '#000',
  display: 'inline-block',
  fontFamily: 'HelveticaNeue-Bold',
  fontSize: '32px',
  fontWeight: 700,
  letterSpacing: '6px',
  lineHeight: '40px',
  paddingBottom: '8px',
  paddingTop: '8px',
  margin: '10px auto',
  width: '100%',
  border: '1px solid #e6ebf1',
  borderRadius: '8px',
  backgroundColor: '#FFF',
  textAlign: 'center' as const,
};

const button = {
  backgroundColor: '#161310',
  borderRadius: '99px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '100%',
  maxWidth: '240px',
  margin: '10px auto 0',
  padding: '10px 0',
};

const buttonalt = {
  backgroundColor: '#FFF',
  borderRadius: '99px',
  border: '1px solid #E5E7EB',
  color: '#161310',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '100%',
  maxWidth: '240px',
  margin: '10px auto 0',
  padding: '10px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
};

export default OctopusEmail;
