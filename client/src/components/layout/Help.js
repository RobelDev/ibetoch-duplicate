import React, { useState, Fragment } from "react";
import HelpItem from "./HelpItem";
import Footer from "../layout/Footer";
const Help = () => {
  const [FAQs, setFAQs] = useState([
    {
      question: "What is iBetoch?",
      answer:
        "Betoch is a home finder web application. It is built to be simple and easy for users to search, post properties based on thier interest.",
      show: false,
    },
    {
      question: "Is iBetoch Free?",
      answer: "Yes, Betoch is a free to use. ",
      show: false,
    },
    {
      question: "Who can use iBetoch",
      answer: "Anyone can use iBetoch.",
      show: false,
    },
    {
      question: "Is iBetoch safe?",
      answer: "iBetoch is safe to use. We value users privacy.",
      show: false,
    },
    {
      question: "What is iBetoch main mission?",
      answer:
        "iBetoch is here to make finding your next home easy and handy. No need to waste your time. ",
      show: false,
    },
    {
      question: "Who can use iBetoch",
      answer: "Anyone can use iBetoch.",
      show: false,
    },
    {
      question: "Is iBetoch safe?",
      answer: "iBetoch is safe to use. We value users privacy.",
      show: false,
    },
    {
      question: "What is iBetoch main mission?",
      answer:
        "iBetoch is here to make finding your next home easy and handy. No need to waste your time. ",
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
        <h3 className="text-center mt-2">FAQs </h3>

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
