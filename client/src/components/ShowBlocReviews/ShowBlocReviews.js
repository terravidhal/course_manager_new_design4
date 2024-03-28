import React from 'react';
import './ShowBlocReviews.css';




const ShowBlocReviews = (props) => {

  const {arrReviews, deleteReview, userObjsId, userObjsRole} = props;

  const handleChangeDate = (val)=>{
     const date = new Date(val);
     const year = date.getFullYear();
     const month = date.getMonth() + 1; // Les mois sont indexés de 0
     const day = date.getDate()
     const formattedDate = `${day}-${month.toString().padStart(2, '0')}-${year}`; 
     return formattedDate;
  }
  console.log('arrReviews',arrReviews);


  return(
    <div className="ShowBlocReviews">
        <div className="page-contents">
             { arrReviews.map((OneReview,index) => {
            return(
              <>
                    <div class="box-container"  key={index}>
                       <div class="box">
                           <div class="userss">
                                {OneReview.studentId.image === "" ?
                                  <img src="/assets/images/blank-profile.png" alt="" />
                                  : 
                                  <img src={`http://localhost:8000/${OneReview.studentId.image}`} alt="" /> 
                                } 
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
                                  <span>{handleChangeDate(OneReview.createdAt)}</span>
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
