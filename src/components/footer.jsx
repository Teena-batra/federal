import React, {Fragment} from 'react'

function footer() {
  return (
<Fragment>

 <footer className="bg-primary py-3">
 <div className="container-lg">
   <div className="row">
     <div className="col-md-8 text-center text-md-start">
       <ul className="list-inline m-0 p-0">
         <li className="list-inline-item">
           <a href="#" className="text-white text-nowrap fs-14 me-2">
             About Us
           </a>
         </li>
         <li className="list-inline-item">
           <a href="#" className="text-white text-nowrap fs-14 me-2">
             FAQ's{" "}
           </a>
         </li>
         <li className="list-inline-item">
           <a href="#" className="text-white text-nowrap fs-14 me-2">
             Terms &amp; Conditions
           </a>
         </li>
         <li className="list-inline-item">
           <a href="#" className="text-white text-nowrap fs-14 me-2">
             Privacy Policy
           </a>
         </li>
         <li className="list-inline-item">
           <a href="#" className="text-white text-nowrap fs-14">
             Customer Support
           </a>
         </li>
       </ul>
     </div>
     <div className="col-md-4 text-center text-md-end mt-3 mt-md-0">
       <span className="text-white fs-14 pt-1 pe-1">Powered by</span>
       <img src="images/frt_logo.png" alt="" />
     </div>
   </div>
 </div>
</footer>

</Fragment>
  )
}

export default footer
