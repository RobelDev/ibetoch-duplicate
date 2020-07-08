// {
//     import React, { useState } from "react";
//     import FacebookLogin from "react-facebook-login";
//     import { Redirect } from "react-router-dom";

//     const Facebook = () => {
//       const [facebookState, setFacebookState] = useState({
//         isFBAuthenticated: false,
//         userID: "",
//         name: "",
//         email: "",
//         avatar: "",
//       });

//       const componentClicked = () => {
//         console.log("clicked");
//       };

//       const responseFacebook = (response) => {
//         setFacebookState({
//           isFBAuthenticated: true,
//           userID: response.userID,
//           name: response.name,
//           email: response.email,
//           avatar: response.picture.data.url,
//         });
//         console.log(response);
//       };
//       const { isFBAuthenticated, userID, name, email, avatar } = facebookState;
//       let fbInfo;

//       if (isFBAuthenticated) {
//         return <Redirect to="/"></Redirect>;
//       } else {
//         fbInfo = (
//           <FacebookLogin
//             appId="627167738008047"
//             autoLoad={true}
//             fields="name,email,picture"
//             onClick={componentClicked}
//             callback={responseFacebook}
//           />
//         );
//       }
//       return <div>{fbInfo}</div>;
//     };

//     export default Facebook;

// }

//   useEffect(() => {
//     getProperty(prop_id);
//   }, []);

//   <Card className="bg-dark text-white">
//   <Card.Img src="holder.js/100px270" alt="Card image" />
//   <Card.ImgOverlay>
//     <Card.Title>Card title</Card.Title>
//     <Card.Text>
//       This is a wider card with supporting text below as a natural lead-in to
//       additional content. This content is a little bit longer.
//     </Card.Text>
//     <Card.Text>Last updated 3 mins ago</Card.Text>
//   </Card.ImgOverlay>
// </Card>   <Card.Img variant="top" src={defaultImage} /> {slide1}
//    /* <Fragment>
//       <Card style={{ width: "48%", height: "50%" }}>
//         <Card.Img src={imagine}></Card.Img>
//         <Card.Body>
//           <Card.ImgOverlay>
//             <Card.Title>
//               {" "}
//               <small className="text-muted">For {purpose}</small>{" "}
//             </Card.Title>
//           </Card.ImgOverlay>
//           <Card.Text>
//             ${price}
//             {bedroom}-Bds|{bathroom}-Bathroom{" "}
//             <Button className="btn btn-secondary btn-sm">
//               <i className="fas fa-heart" />
//             </Button>
//             <br />
//             {address}
//           </Card.Text>
//         </Card.Body>
//       </Card>
//     </Fragment> */

//remove likes
// export const unLike = (prop_id) => async (dispatch) => {
//   try {
//     ///profile/like/:prop_id
//     const response = await axios.put(
//       `http://localhost:5000/api/property/profile/unlike/${prop_id}`
//     );

//     dispatch({
//       type: constants.UNLIKE,
//       payload: { likes: response.data, prop_id },
//     });

//     //toast.success("Property unliked");
//   } catch (error) {
//     console.log(error);
//     toast.error(error.response.data.msg);
//     const errList = error.response.data.errors;
//     if (errList) {
//       errList.forEach((err) => toast.error(err.msg));
//     }
//     // dispatch({
//     //   type: constants.PROPERTY_ERROR,
//     //   payload: {
//     //     msg: error.response.statusText,
//     //     status: error.response.status,
//     //   },
//     // });
//     //dispatch({ type: constants.REGISTER_FAILED });
//   }
// };

//APIS
// @route PUT api/profile/unlike/:id
// @desc unlike/dislike a property post
// @access private
// router.put("/profile/unlike/:prop_id", auth, async (req, res) => {
//   try {
//     const property = await Property.findById(req.params.prop_id);

//     if (
//       property.interests.filter(
//         (interest) => interest.user.toString() === req.user.id
//       ).length === 0
//     ) {
//       return res.status(400).json({ msg: "Profile post not liked yet" });
//     }
//     //otherwise

//     const interestedIndex = property.interests
//       .map((interested) => interested.user.toString())
//       .indexOf(req.user.id);

//     property.interests.splice(interestedIndex, 1);

//     await property.save();
//     res.json(property.interests);
//     //res.json(property.interests);
//   } catch (error) {
//     console.error(error.message);
//     if (error.kind == "ObjectId") {
//       return res.status(400).json({ msg: "Profile not found!" });
//     }
//     res.status(500).send("Server Error");
//   }
// });

// //Add a property update
// // @route PUT api/property/propertyupdate/:prop_id
// // @desc update a property post
// // @access private
// router.put("/propertyupdate/:prop_id", auth, async (req, res) => {
//   const { sold, price, availability, contactInfo, lease, estimate } = req.body;

//   const propertyFields = {
//     sold,
//     price,
//   };
//   try {
//     let property = await Property.findById(req.params.prop_id);

//     if (!property) {
//       return res.status(400).json({ msg: "Property not found" });
//     }

//     //make sure it belongs to the right user

//     if (property.user.toString() !== req.user.id) {
//       return res.status(401).json({ msg: "User not authorized" });
//     }

//     property.propertyupdate.unshift({ $set: propertyFields }, { new: true });

//     //save it to mongo db
//     await property.save();

//     res.json({ property, msg: "Property update profile updated" });
//   } catch (error) {
//     console.error(error.message);
//     if (error.kind == "ObjectId") {
//       return res.status(400).json({ msg: "Profile not found!" });
//     }
//     res.status(500).send("Server Error");
//   }
// });

// router.put(
//   "/profile/images/:prop_id",
//   auth,
//   // fileUpload.array("images", 9),
//   async (req, res) => {
//     if (!req.files) {
//       return res.status(400).json({ msg: "Pick image/s please" });
//     }

//     const file = req.files.file;

//     file.mv(`${__dirname}/client/public/uploaded/${file.name}`, (error) => {
//       if (error) {
//         console.log(error);
//         return res.status(400).json(error);
//       }
//     });

//     // const { image } = req.files;
//     const imageField = {
//       filename: file.name,
//       filePath: `/uploaded/${file.name}`,
//       //   image,
//     };

//     try {
//       const property = await Property.findById(req.params.prop_id);

//       if (!property) {
//         return res.status(400).json({ msg: "property not found!" });
//       }
//       if (property.user.toString() !== req.user.id) {
//         return res.status(401).json({ msg: "Not Authorized user" });
//       }

//       property.images.unshift(imageField);
//       //profile.images = new Profile.images(imageField);

//       // save it to database
//       await property.save();

//       //send back the profile
//       res.json(property.images);
//       //console.log({ imageField });
//       console.log(req.files.file);
//     } catch (error) {
//       console.error(error.message);
//       if (error.kind == "ObjectId") {
//         return res.status(400).json({ msg: "Profile not found!" });
//       }
//     }
//   }
// );

// router.put(
//   "/profile/images/:prop_id",
//   auth,
//   fileUpload.array("images", 9),
//   async (req, res) => {
//     // //const files = req.files;
//     // const imageField = { image };

//     if (!req.files) {
//       return res.status(400).json({ msg: "Pick image/s please" });
//     }

//     const { image } = req.files;
//     const imageField = {
//       image,
//     };

//     try {
//       const property = await Property.findById(req.params.prop_id);

//       if (!property) {
//         return res.status(400).json({ msg: "property not found!" });
//       }
//       if (property.user.toString() !== req.user.id) {
//         return res.status(401).json({ msg: "Not Authorized user" });
//       }

//       property.images.unshift(imageField);
//       //profile.images = new Profile.images(imageField);

//       // save it to database
//       await property.save();

//       //send back the profile
//       res.json(property.images);
//       //console.log({ imageField });
//       console.log(req.files);
//     } catch (error) {
//       console.error(error.message);
//       if (error.kind == "ObjectId") {
//         return res.status(400).json({ msg: "Profile not found!" });
//       }
//     }
//   }
// );

// router.get("/", async (req, res) => {
//   const propertys = await Property.find();

//   const queryAddress = req.query.address;

//   //get all property
//   //loop throught the propertys if they have your user id on their likes array
//   try {
//     const arrayPropertys = [];

//     // let filteredPropertys =
//     //   // propertys &&
//     //   propertys.map((property) => {
//     //     return (
//     //       property.address.toLowerCase().indexOf(queryAddress.toLowerCase()) !==
//     //       -1
//     //     );
//     //   });

//     // res.json(filteredPropertys);

//     propertys.map((property) => {
//       property.address.toLowerCase().indexOf(queryAddress.toLowerCase()) !== -1
//         ? arrayPropertys.push(property)
//         : //console.log(singleproperty)
//           "";
//     });

//     res.json(arrayPropertys);
//     // const singleprop = property.map((singleproperty) => singleproperty._id);
//   } catch (error) {
//     console.log(error);
//   }
// });


{/* <footer
        className="page-footer font-small"
        style={{ backgroundColor: "rgb(230, 243, 255)" }}
      >
        <div style={{ backgroundColor: "white" }}>
          <div className="container">
            <div className="row py-4 d-flex align-items-center">
              <div className="col-md-6 col-lg-5 text-center text-md-left mb-4 mb-md-0">
                <h6 className="mb-0">
                  Get connected with us on social networks!
                </h6>
              </div>

              <div className="col-md-6 col-lg-7 text-center text-md-right">
                <a
                  className="fb-ic"
                  href="https://www.facebook.com/IBetoch-110093160772304/?modal=admin_todo_tour"
                >
                  <i className="fab fa-facebook-f white-text mr-4" />
                </a>

                <a className="tw-ic" href="#!">
                  <i className="fab fa-twitter white-text mr-4"> </i>
                </a>

                <a className="gplus-ic" href="#!">
                  <i className="fab fa-google-plus-g white-text mr-4"> </i>
                </a>

                <a className="li-ic" href="#!">
                  <i className="fab fa-linkedin-in white-text mr-4"> </i>
                </a>

                <a className="ins-ic" href="https://www.instagram.com/ibetoch/">
                  <i className="fab fa-instagram white-text" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="container text-center text-md-left mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase font-weight-bold">Company</h6>
              <hr
                className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
                style={{ width: "60px" }}
              />
              <p>
                we are here to make finding your next home easier. On a just a
                click you will have the options to choose from many houses,
                apartment posted by owners, real estates...
              </p>
            </div>

            {/* <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase font-weight-bold">Products</h6>
              <hr
                className="deep-purple accent-4 mb-3 mt-0 d-inline-block mx-auto"
                style={{ width: "60px" }}
              />
              <p>
                <a href="/propertys">Property Posts</a>
              </p>
              <p>
                <a href="#!">
                  Partners <small>coming soon</small>
                </a>
              </p>
              <p>
                <a href="#!">
                  BrandFlow <small>coming soon</small>
                </a>
              </p>
              <p>
                <a href="#!"></a>
              </p>
            </div> */}

            {/* <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase font-weight-bold"> Links</h6>
              <hr
                className="deep-purple accent-0 mb-4 mt-0 d-inline-block mx-auto"
                style={{ width: "60px" }}
              />

              <h6>
                <a href="#!">Become an Affiliate</a>
              </h6>

              <p>
                <a href="/help">Help</a>
              </p>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase font-weight-bold">Contact</h6>
              <hr
                className="deep-purple accent-0 mb-4 mt-0 d-inline-block mx-auto"
                style={{ width: "60px" }}
              />
              <p>
                <i className="fas fa-home mr-3"></i> Arizona, USA
              </p>
              <p>
                <i className="fas fa-home mr-3"></i> Addis-ababa, Ethiopia
              </p>
              <p>
                <i className="fas fa-envelope mr-3"></i> robikidin1@gmail.com
              </p>
              {/* <p>
                <i className="fas fa-phone mr-3"></i> + 1 928 514 4183
              </p> */}
            {/* </div>
          </div>
        </div>

        <div className="footer-copyright text-center py-2">
          © 2020 Copyright:
          <a href="https://IBetoch.com/"> IBetoch.com</a>
        </div>
      // </footer> */} 
