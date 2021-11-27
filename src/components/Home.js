import React from "react";

const Home = ( props ) => {
    return (
        <div className="row">
            <div className="col-md-7">
                <h1>Learn modern JavaScript Tech Stack</h1>
                <p>Become a job-ready developer by studying under a proven system and curriculum which has helped hundreds of students land jobs in the software field. The curriculum is well structured and relevant to the current requirements in the industry.</p>

                <p>Get trained in modern technologies like JavaScript, React JS and Node Js by developing hands-on projects. Industry-experienced professionals will give you personal guidance and mentorship. The knowledge you gain during the course time will help you quickly crack interviews at tech companies.</p>

                <p>Join thousands of students from around the world who have up skilled with us.</p>
            </div>
            <div className="col-md-5">
                <div className="card bg-light mb-3" style={{right:'20px'}}>
                    <div className="card-header"><h1>Confused?</h1></div>
                    <div className="card-body">
                        <h5 className="card-title">What to do next</h5>
                        <p className="card-text">Have you finished your engineering and not sure how to get a job? Or Are you someone currently working and want to shift into development?</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
