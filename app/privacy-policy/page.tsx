import { sanityClient } from '../../sanity';
import { PortableText } from '@portabletext/react';

async function getPrivacyPolicy() {
  const query = `*[_type == "privacyPolicy"][0]`; // Fetch the first privacy policy document
  const privacyPolicy = await sanityClient.fetch(query);
  return privacyPolicy;
}

const components = {
    types: {
      image: ({ value }: any) => (
        <img
          src={value.asset.url}
          alt={value.alt || 'Image'}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      ),
    },
    marks: {
      link: ({ children, value }: any) => (
        <a href={value.href} target={value.newTab ? '_blank' : '_self'} rel="noopener noreferrer">
          {children}
        </a>
      ),
    },
    block: {
      h1: ({ children }: any) => <h1 className="text-4xl font-bold mb-[1.7rem]">{children}</h1>,
      h2: ({ children }: any) => <h2 className="text-3xl font-semibold mb-[1.7rem]">{children}</h2>,
      h4: ({ children }: any) => <h4 className="text-2xl font-[1000]  mb-[1.7rem]">{children}</h4>,
      normal: ({ children }: any) => <p className="text-base text-thin leading-6 mb-[1rem]">{children}</p>,
    },
    list: {
      bullet: ({ children }: any) => <ul className="list-disc ml-6 mb-4">{children}</ul>,
      number: ({ children }: any) => <ol className="list-decimal ml-6 mb-4">{children}</ol>,
    },
    listItem: {
      bullet: ({ children }: any) => <li className="mb-2">{children}</li>,
      number: ({ children }: any) => <li className="mb-2">{children}</li>,
    },
  };

export default async function PrivacyPolicyPage() {
  const privacyPolicy = await getPrivacyPolicy();

  return (
    <div className='mt-[16rem] mb-[3rem]'>
      <h1 className='text-[2.5rem] text-center'>{privacyPolicy.title}</h1>
      <div className='px-[5.5rem] mt-[5rem]'>
       <PortableText value={privacyPolicy.content} components={components} />
      </div>
    </div>
  );
}
