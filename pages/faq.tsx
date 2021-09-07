import React from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import FAQItem from "../components/FAQItem";

const FAQ: React.FC = () => {
  const title = "OmitPlastic | Frequently asked questions about reducing plastic pollution.";
  const description =
    "Answers to frequently asked questions about reducing plastic pollution. OmitPlastic helps you buy products with less plastic.";
  const image = "/public/images/ocean-plastic.jpg";

  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta
          property="og:url"
          content="https://www.omitplastic.com/faq"
        />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
      </Head>
      <h1 className="p-4 md:px-8 border-b-2 border-solid border-gray-300 leading-tight">
        Frequently Asked Questions
      </h1>
      <div className="p-4 md:p-8 grid grid-cols-1 w-full gap-8 sm:grid-cols-2">
        <FAQItem
          question={<>How did you determine which products to include here?</>}
          answer={
            <>
              The majority of{" "}
              <a
                href="https://www.iucn.org/resources/issues-briefs/marine-plastics"
                target="_blank"
                rel="noreferrer"
              >
                marine waste
              </a>{" "}
              is from single-use plastic and we want to change that. We&apos;ve
              curated a selection of products that replace single-use plastic
              items, are well-designed, and get high ratings. The ideal product
              is free of plastic, but that isn&apos;t always possible so we also
              look for ones with recycled content and lower plastic content.
            </>
          }
        />
        <FAQItem
          question={<>What is BPA and why should I avoid it?</>}
          answer={
            <>
              BPA stands for bisphenol A, an industrial chemical that is found
              in polycarbonate plastics and epoxy resins. Several toxic effects
              have been linked to BPA in the past, including infertility, IBS,
              vitamin D deficiency, and cancer according to{" "}
              <a
                href="https://draxe.com/health/bpa-toxic-effects/"
                target="_blank"
                rel="noreferrer"
              >
                Dr. Josh Axe
              </a>
              . If a product isn&apos;t labeled, the{" "}
              <a
                href="https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/expert-answers/bpa/faq-20058331"
                target="_blank"
                rel="noreferrer"
              >
                Mayo Clinic
              </a>{" "}
              notes that some, but not all, plastics marked with recycle code 3
              or 7 may contain BPA.
            </>
          }
        />
        <FAQItem
          question={
            <>
              What&apos;s the difference between a biodegradable and compostable
              product?
            </>
          }
          answer={
            <>
              Biodegradable items refer to any material that breaks down and
              decomposes in the environment, while compostable items are organic
              matter that breaks down into nutrient-rich soil. It&apos;s
              important to understand that compostable products require certain
              conditions to break down, so you must commit to actually
              composting those items properly, rather than just sending them to
              a landfill.{" "}
              <a
                href="https://www.bhg.com/gardening/yard/compost/how-to-compost/"
                target="_blank"
                rel="noreferrer"
              >
                Go here
              </a>{" "}
              to learn how to compost.
            </>
          }
        />
        <FAQItem
          question={<>How do I buy a product?</>}
          answer={
            <>
              Click on the BUY button to take you to the retailer&apos;s site
              where you can buy the product.
            </>
          }
        />
      </div>
    </Layout>
  );
};

export default FAQ;
