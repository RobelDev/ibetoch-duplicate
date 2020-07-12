import React, { useState, Fragment } from "react";
import HelpItem from "./HelpItem";
import Footer from "../layout/Footer";
const Help = () => {
  const [FAQs, setFAQs] = useState([
    {
      question: "What is iBetoch?",
      answer:
        "iBetoch is a home finder web application. It is built to be simple and easy for users to search, post and saveproperties based on thier interest.",
      show: false,
    },
    {
      question: "Is iBetoch Free?",
      answer: "Yes, iBetoch is a free to use. ",
      show: false,
    },
    {
      question: "Who can use iBetoch",
      answer: "Anyone can use iBetoch.",
      show: false,
    },
    {
      question: "Can I be an affilate/work with iBetoch",
      answer:
        "Yes, of course. Please visit our affilate or work with iBetoch page.",
      show: false,
    },
    {
      question: "Can I advertise on iBetoch",
      answer:
        "Yes, of course. Please visit our affilate or work with iBetoch page for more information about advertising.",
      show: false,
    },
    {
      question: "Is iBetoch safe?",
      answer:
        "iBetoch is safe to use. We value users privacy. For more information, read our policy privacy.",
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
      answer: "please visit privacy and polict on the bottom page.",
      show: false,
    },
    {
      question: "How can I report a suspicious property listing or account?",
      answer:
        "Please report a property by going to the property page and click report and choose your reason. Or contact us by visiting Contact Us page found on the bottom of the page.",
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
