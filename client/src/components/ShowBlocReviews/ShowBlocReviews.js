import React, { useEffect, useState } from 'react';
import './ShowBlocReviews.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
//import axios from 'axios';



const ShowBlocReviews = (props) => {

  const {arrReviews, deleteReview, userObjsId, userObjsRole} = props;

  const handleChange = (val)=>{
     const date = new Date(val);
     const year = date.getFullYear();
     const month = date.getMonth() + 1; // Les mois sont indexés de 0
     const day = date.getDate()
     const formattedDate = `${day}-${month.toString().padStart(2, '0')}-${year}`; 
     return formattedDate;
  }

  const getRandomNumberBetween1And9 = () => {
    // Générer un nombre aléatoire entre 0 et 0.999999...
    const randomFloat = Math.random();
    // Multiplier par 9 pour obtenir un nombre entre 0 et 6
    const randomNumber = randomFloat * 6;
    // Arrondir au nombre entier le plus proche
    const roundedNumber = Math.floor(randomNumber) + 1;
    // Renvoyer le nombre aléatoire entre 1 et 9
    console.log(roundedNumber);
    return roundedNumber;
  }

  const randomNumber = getRandomNumberBetween1And9();
  const imageURL = `<img src="/assets/images/pic-${randomNumber}.jpg" alt="" />`;


 
  return(
    <div className="ShowBlocReviews">
        <div className="page-contents">
             { arrReviews.map((OneReview,index) => {
            return(
              <>
                 {/*<div className="fields"  key={index}>
                    <div className="details-img">
                       <img src="/assets/images/OIG1.jfif" alt="" /> 
                    </div>
                   <p><span className='infos'>name student:</span>{OneReview.studentId.name}</p>
                   <p><span className='infos'>Level student:</span>{OneReview.studentId.fieldOfStudy}</p>
                   <p><span className='infos'>comment::</span>{OneReview.reviewText}</p>
                   <p><span className='infos'>date::</span>{handleChange(OneReview.createdAt)}</p>
                   <p><span className='infos'>rating:</span> {OneReview.rating}</p>
                   <button onClick={() => deleteReview(OneReview._id)}>Delete comment</button> 
                </div>*/}
                    <div class="box-container"  key={index}>
                       <div class="box">
                           <div class="user">
                               <img src={"/assets/images/pic-"+getRandomNumberBetween1And9()+".jpg"} alt="" />
                               <div>
                                <div className="name-stars">
                                  <h3>{OneReview.studentId.name}</h3>
                                  <div class="stars">
                                      {OneReview.rating === 1 ?
                                        <i class="fas fa-star"></i>
                                        : OneReview.rating === 2 ?
                                        <>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        </>
                                        :  OneReview.rating === 3 ?
                                        <>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        </>
                                        :  OneReview.rating === 4 ?
                                        <>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        </>
                                        :  OneReview.rating === 5 ?
                                        <>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        </> : null
                                      }
                                  </div>
                                </div>
                                  <span>{handleChange(OneReview.createdAt)}</span>
                               </div>
                           </div>
                           <div class="comment-box">{OneReview.reviewText}</div>
                           {userObjsId === OneReview.studentId._id || userObjsRole === 'admin' ||  userObjsRole === 'instructor' ?
                              <form action="" class="flex-btn">
                                 <button name="delete_comment" class="inline-delete-btn" onClick={(ev) => deleteReview(OneReview._id, ev)}>Delete comment</button> 
                              </form>
                              : null
                           }
                       </div>
                    </div>
              </>
            );
          }) }
        </div>
    </div>
  );
};


export default ShowBlocReviews;
