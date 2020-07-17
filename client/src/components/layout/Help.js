import React, { useState, Fragment } from "react";
import HelpItem from "./HelpItem";
import Footer from "../layout/Footer";
const Help = () => {
  const [FAQs, setFAQs] = useState([
    {
      question: "What is iBetoch?",
      answer:
        "iBetoch is a home finder web application. It is built to be simple and easy for users to search, post and save properties based on thier interest.",
      show: false,
    },
    {
      question: "Is iBetoch Free?",
      answer: "Yes, iBetoch is a free to use. ",
      show: false,
    },
    {
      question: "How can I post my property",
      answer:
        "Create an account first > go to My Properties > click create property.",
      show: false,
    },
    {
      question: "How can I update, add images, delete images, delete property",
      answer:
        "Go to My Properties > use the buttons found on each property. Click Imgs to view the images and to choose which image to remove. Click Add Image to add an image. Click Update to update/edit your property listing. Click Delete to delete property.",
      show: false,
    },
    {
      question: "Can I be an affilate/work with iBetoch",
      answer: "Yes, of course. Please visit our Work with iBetoch page.",
      show: false,
    },
    {
      question: "Can I advertise on iBetoch",
      answer:
        "Yes, of course. Please visit our Work with iBetoch page for more information about advertising.",
      show: false,
    },
    {
      question: "Is iBetoch safe?",
      answer:
        "iBetoch is safe to use. We value users privacy. For more information, read our privacy policy.",
      show: false,
    },
    {
      question: "What are terms and conditions for iBetoch?",
      answer: "For more information, read our terms & conditions.",
      show: false,
    },
    {
      question: "What is iBetoch main mission?",
      answer:
        "iBetoch is here to make finding your next home easy and handy. No need to waste your time. ",
      show: false,
    },
    {
      question: "What is iBetoch's privacy",
      answer: "Please visit privacy and polict on the bottom page.",
      show: false,
    },
    {
      question: "How can I report a suspicious property listing or account?",
      answer:
        "We value the security of users. We work hard to make iBetoch save environment for users. To report suspicious listing, Double Click on a property > click report button on the bottom of the corner. OR Contact us by visting the Contact Us page or email us team@ibetoch.com so we can take the appropriate measures to inspect them.",
      show: false,
    },
    {
      question: "How can I report a bug or issue with the website?",
      answer:
        "Please visit Contact Us page and fill-out the form. Or write us an email directly to: team@ibetoch.com. ",
      show: false,
    },
  ]);

  const toggle = (indx) => {
    setFAQs(
      FAQs.map((faq, index) => {
        if (index === indx) {
          faq.show = !faq.show;
        } else {
          faq.show = false;
        }

        return faq;
      })
    );
  };
  return (
    <Fragment>
      <div className="container">
        <h3 className="text-center mt-2">
          {" "}
          <i className="fa fa-question-circle" /> FAQs{" "}
        </h3>

        <div className="faqs ">
          {FAQs.map((faq, indx) => (
            <HelpItem key={indx} faq={faq} index={indx} toggle={toggle} />
          ))}
        </div>
      </div>
      <div className="">
        <Footer />
      </div>
    </Fragment>
  );
};

export default Help;
