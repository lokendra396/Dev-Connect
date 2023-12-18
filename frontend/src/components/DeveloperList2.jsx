import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import axios from "axios";
import Swal from "sweetalert2";

function DeveloperList2() {
   let navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const[follow,setFollow] = useState([]);
  const[loading1, setLoading1] = useState(true);

  const fetchProfiles = async () => {
    const { data } = await axios.get(
      "https://devconnect-backend-nno6.onrender.com/api/profiles/all/me",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("devconnect")}`,
        },
      }
    );
    setProfiles(data.profiles);
    setLoading(false);
  };

  const fetchFollowList = async() =>{
    let {data,status}  = await axios.get("https://devconnect-backend-nno6.onrender.com/api/profiles/me", {
         headers: {
           "Content-Type": "application/json",
           Authorization: `Bearer ${localStorage.getItem("devconnect")}`,
         },
       });
       console.log(data);
       console.log(status);
       if (status == 200){ 
        setFollow(data.profile.follower);
      setLoading1(false);}
      if(status == 201)
      {
        Swal.fire("User need to create profile first","", "warning");
        navigate("/profiles/dashboard");
      }
  };

  let Unfollow = async(key1) =>{
    await axios.put("https://devconnect-backend-nno6.onrender.com/api/profiles/unfollow",{unfollowed_person:key1},{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("devconnect")}`,
      },
  });
  console.log("navigated");
  navigate("/developers");
  fetchFollowList();
  }

  let StartFollow = async(key1) =>{
    await axios.put("https://devconnect-backend-nno6.onrender.com/api/profiles/follow",{followed_person:key1},{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("devconnect")}`,
      },
  });
  console.log("navigated");
  navigate("/developers");fetchFollowList();
};

function check(e)
{
  return e==this;
}
  useEffect(() => {
    fetchProfiles();
    fetchFollowList();
  }, []);

      return (
      <React.Fragment>
        <section className="p-3">
          <div className="container">
            <div className="row animated zoomIn">
              <div className="col">
                <p className="h3 text-teal">
                  <i className="fa fa-user-tie" /> Developers
                </p>
                <p>List of registered developers</p>
              </div>
            </div>
          </div>
        </section>
        <section>
          {loading || loading1? (
            <Spinner />
          ) : (
            <React.Fragment>
              {profiles.length > 0 ? (
                <React.Fragment>
                  <div className="container">
                    <div className="row">
                      <div className="col">
                        {profiles.map((profile) => {
                          return (
                            <div
                              className="card my-2 animated zoomIn"
                              key={profile._id}
                            >
                              <div className="card-body bg-light-grey">
                                <div className="row">
                                  <div className="col-md-2">
                                    <img
                                      src={profile.user.avatar}
                                      className="img-fluid img-thumbnail"
                                      alt=""
                                    />
                                  </div>
                                  <div className="col-md-5">
                                    <h2>{profile.user.name}</h2>
                                    <small className="h6">
                                      {profile.website}
                                    </small>
                                    <br />
                                    <small className="h6">
                                      {profile.designation}
                                    </small>
                                    <br />
                                    <small className="h6">
                                      {profile.company}
                                    </small>
                                    <br />
                                    <small>{profile.location}</small>
                                    <br />
                                    <Link
                                      to={`/developers/${profile._id}`}
                                      className="btn btn-teal btn-sm"
                                    >
                                      View Profile
                                    </Link>

                                    {
                                      follow.some(check,profile.user._id)? (
                                      <button className="btn btn-success btn-sm ms-1" onClick={() => Unfollow(profile.user._id)}>
                                        Following
                                      </button>
                                    ) :(<button className="btn btn-warning btn-sm ms-1" onClick={()=>StartFollow(profile.user._id)}>
                                        Follow
                                    </button>)

                                    }
                                  </div>

                                  {/*Div for Skills*/}
                                  <div className="col-md-5 d-flex justify-content-center flex-wrap ">
                                    {profile.skills.length > 0 &&
                                      profile.skills.map((skill, index) => {
                                        return (
                                          <div key={index}>
                                            <span className="badge badge-success p-2 m-1">
                                              <i className="fa fa-check-circle" />{" "}
                                              {skill}
                                            </span>
                                            <br />
                                          </div>
                                        );
                                      })}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ) : null}
            </React.Fragment>
          )}
        </section>
      </React.Fragment>
      ); };

export default DeveloperList2;
