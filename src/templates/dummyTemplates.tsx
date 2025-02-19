export const octopusTemplate = `({ customer, client }) => {
  const main = {
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
    background: '#FBF5EB',
    margin: 0,
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
    textAlign: 'left',
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
    border: '1px solid #e6ebf1',
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
    textAlign: 'center',
  };

  const button = {
    backgroundColor: '#161310',
    borderRadius: '99px',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    textDecoration: 'none',
    textAlign: 'center',
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
    textAlign: 'center',
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

  return (
    <Tailwind>
      <Html>
        <Head>
          <meta name='color-scheme' content='light' />
          <meta name='supported-color-schemes' content='light' />
        </Head>
        <Preview>Clear your debt, your way with Ophelos</Preview>
        <Body style={main}>
          <div className='bg-[#FBF5EB] sm:py-6'>
            <Container className='bg-white py-6 sm:rounded-lg w-lg'>
              <Section style={box}>
                <Img className='mb-8' src='https://connect.ophelos.com/assets/Ophelos_Intrum-01568c59.png' width='150' height='43' alt='Ophelos Company Logo' />
                <Heading as='h1' className='text-3xl font-bold'>
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
                <Text style={paragraph}>Hi {customer.first_name},</Text>
                <Text style={paragraph}>
                  We're{' '}
                  <Link style={anchor} href='https://www.ophelos.com'>
                    Ophelos
                  </Link>{' '}
                  — here to help you clear your {customer.debt_amount} debt with{' '}
                  <Link style={anchor} href={client.website}>
                    {client.name}
                  </Link>
                  .
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
                  <Text style={code}>{customer.ref_code}</Text>
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
}`;

export const intrumTemplate = `({ customer, client }) => {
const main = {
  backgroundColor: '#F8F9FB',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const wrapper = {
  backgroundColor: '#F8F9FB',
  padding: '20px 0',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  borderRadius: '6px',
  border: '2px solid #E5E7EB',
};

const box = {
  padding: '0 48px',
};

const textBox = {
  padding: '28px 48px',
};

const heading = {
  fontSize: '24px',
  lineHeight: '32px',
  color: '#1F2937',
  padding: '10px 20px',
  fontWeight: '800',
};

const logo = {
  width: '150px',
  padding: '10px 20px',
};

const heroImage = {
  width: '100%',
  height: 'auto',
  display: 'block',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const paragraph = {
  color: '#525f7f',

  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left',
};

const button = {
  backgroundColor: '#00A0A5',
  border: '1px solid #006063',
  borderRadius: '6px',
  color: '#ffffff',
  fontSize: '18px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center',
  display: 'block',
  padding: '16px 36px',
};

const footer = {
  maxWidth: '37.5rem',
  margin: '16px auto 0',
};

const debtsSection = {
  margin: '0',
  padding: '24px',
  backgroundColor: '#C7E4E2',
};

const debtsHeading = {
  fontSize: '20px',
  color: '#181818',
  margin: '0 0 12px',
  fontWeight: '600',
};

const debtsList = {
  margin: '0',
  padding: '0',
};

const debtsItem = {
  margin: '0 0 8px',
  display: 'flex',
  justifyContent: 'space-between',
};

const debtsTitle = {
  fontSize: '16px',
  color: '#181818',
  margin: '0',
  fontWeight: '400',
};

const debtsDesc = {
  fontSize: '14px',
  color: '#181818',
  margin: '0',
  fontWeight: '600',
};

const debtsDivider = {
  margin: '8px 0',
  width: '100%',
  height: '1px',
  backgroundColor: '#66C6C9',
};

const codeBox = {
  textAlign: 'center',
};

const codeLabel = {
  fontSize: '14px',
  color: '#181818',
  margin: '0 0 8px',
  fontWeight: '500',
};

const code = {
  fontSize: '36px',
  fontWeight: '700',
  letterSpacing: '8px',
  color: '#005969',
  margin: '0 0 12px',
  padding: '12px',
  backgroundColor: '#FFFFFF',
  borderRadius: '8px',
  border: '2px solid #E5E7EB',
};

return (
<Tailwind>
<Html>
  <Head />
  <Preview>You're now ready to make live transactions with Stripe!</Preview>
  <Body style={main}>
    <div style={wrapper}>
      <Container style={container}>
        <Section style={box}>
          <Img src="https://www.intrum.com/icons/Intrum_Logo_RGB_Black.svg" width='150' height='' alt='Intrum Company Logo' style={logo} />
          <Heading as='h1' style={heading}>
            Your debt of {customer.debt_amount} with Klarna is now managed by Intrum.
          </Heading>
        </Section>
        <Img src="https://cdn.prod.website-files.com/66c89a35990c4fc98fdda0a7/67b4f9641509a6b18fb7efae_intrum-image.png" alt='Take control with Ophelos' width='600' height='300' style={heroImage} />
        <Section style={textBox}>
          <Text style={paragraph}>Hi {customer.first_name},</Text>
          <Text style={paragraph}>
            We understand that owing money can be really stressful, so if you have any questions please reach out to us so we can help.
          </Text>
        </Section>

        <Section style={debtsSection}>
          <Text style={debtsHeading}>Details of your debt total</Text>
          <div style={debtsList}>
            <div style={debtsItem}>
              <Text style={debtsTitle}>Principal amount</Text>
              <Text style={debtsDesc}>£599.99</Text>
            </div>
            <div style={debtsItem}>
              <Text style={debtsTitle}>Interest</Text>
              <Text style={debtsDesc}>£11.99</Text>
            </div>
            <div style={debtsItem}>
              <Text style={debtsTitle}>Your payments</Text>
              <Text style={debtsDesc}>-£100.00</Text>
            </div>
            <div style={debtsItem}>
              <Text style={debtsTitle}>VAT</Text>
              <Text style={debtsDesc}>£65.56</Text>
            </div>
            <div style={debtsDivider}></div>
            <div style={debtsItem}>
              <Text style={debtsTitle}>Total owed</Text>
              <Text style={debtsDesc}>£577.54</Text>
            </div>
          </div>
        </Section>

        <Section style={textBox}>
          <div style={codeBox}>
            <Text style={codeLabel}>Your exclusive access code:</Text>
            <Text style={code}>{customer.ref_code}</Text>
          </div>
          <Button style={button} href='https://connect.ophelos.com'>
            Resolve Your Debt Now
          </Button>
          <Text style={paragraph}>Follow the link and enter your code to:</Text>
          <ul style={paragraph}>
            <li>see details of your debt </li>
            <li>compare different payment options and set up a payment plan </li>
            <li>contact us if you need help</li>
          </ul>
          <Text style={paragraph}>
            Your Intrum case number: <b>[intrum_case_number]</b>
          </Text>
          <Hr style={hr} />
          <Hr style={hr} />
              <Text style={paragraph}>
                Privacy statement Your data will be included in Intrum's database. You have the right to inspect and rectify, delete or limit the
                processing of your personal data, as well as the right to object to the processing of your personal data. For more information, please
                read our Privacy Statement.
              </Text>
            </Section>
          </Container>
          <Img
            src='https://cdn.prod.website-files.com/66c89a35990c4fc98fdda0a7/67b4fa17956140ab9148ffa7_Screenshot%202023-11-22%20at%2011.14%201.png'
            alt='Ophelos'
            width='600'
            style={footer}
          />
        </div>
      </Body>
    </Html>
  </Tailwind>
  );
}`;

// export const clearpayTemplate = `...`;

export const getDummyTemplate = (client: string) => {
  switch (client) {
    case 'Octopus':
      return octopusTemplate;
    case 'Intrum':
      return intrumTemplate;
    // case 'Clearpay':
    //   return clearpayTemplate;
    default:
      return '';
  }
};
