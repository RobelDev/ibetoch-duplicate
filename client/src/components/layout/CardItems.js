import React from "react";

import { Card } from "react-bootstrap";

const CardItems = () => {
  return (
    <section className="container ">
      <br />
      <br />
      <h3 className="text-center">What is Betoch?</h3>

      <div className="container text-center">
        <div className="row">
          <div className="col-sm-">
            <Card style={{ width: "20rem", border: "transparent" }}>
              <Card.Body>
                <Card.Title>Search</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Search your next home
                </Card.Subtitle>
                <Card.Text>
                  iBetoch has a list of Houses, Apartments, Condos, Townhouses
                  posted by owners', Agents', or Real-estates. Searching for
                  houses is easier with Betoch no need to waste your precious
                  time.
                </Card.Text>
                <Card.Link href="/propertys">Find Properties</Card.Link>
              </Card.Body>
            </Card>
          </div>
          <div className="col-sm-">
            <Card
              style={{ width: "18rem", border: "medium solid transparent" }}
            >
              <Card.Body>
                <Card.Title>Post </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Post your Properties
                </Card.Subtitle>
                <Card.Text>
                  Create an account with us and post your vaccant properties
                  either for sell or rent. Provide all valuable informations so
                  users could find your properties easily.{" "}
                </Card.Text>
                <Card.Link href="/createproperty">Create Property</Card.Link>
              </Card.Body>
            </Card>
          </div>
          <div className="col-sm-">
            <Card
              style={{ width: "20rem", border: "medium solid transparent" }}
            >
              <Card.Body>
                <Card.Title>Save</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Save Properties
                </Card.Subtitle>
                <Card.Text>
                  iBetoch is built to be simple and easier for users. After
                  finding property for Rent or Sell, Save them to your liked
                  list and contact the Owner, agent, or Real-estate
                  representative with the provided information.
                </Card.Text>
                <Card.Link href="/mylikedpropertys">
                  My Liked Properties
                </Card.Link>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
      <hr />
      <p>
        iBetoch is Free of any charge to use. We value the security of
        users("Betochers") carefully. Please report properties that look
        suspicious to our email address or on report link(
        <strong> info@ibetoch.com </strong> or{" "}
        <strong>robikidin1@gmail.com</strong> for the time being) so we can take
        the appropriate measures to inspect them.
      </p>
      <hr />
      <h5 className="text-center">
        Contact or Follow the creator and owner of this site at{" "}
        <a
          className="li-ic"
          href="https://www.linkedin.com/in/robel-tegegne-93a33b133/"
        >
          <i className="fab fa-linkedin-in white-text mr-1" />
          :@
          <strong>Robel Kidin Tegegne</strong>{" "}
        </a>
      </h5>
      <p></p>
      <hr />
    </section>
  );
};

export default CardItems;
