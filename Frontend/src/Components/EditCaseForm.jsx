
// import React, { useState, useEffect } from "react";

// const EditCaseForm = ({ caseData, onSubmit }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     age: "",
//     gender: "",
//     maritalStatus: "",
//     occupation: "",
//     address: "",
//     phone: "",
//     date: "",
//     chiefComplaints: "",
//     history: "",
//     pastHistory: "",
//     familyHistory: "",
//     appetite: "",
//     cravings: "",
//     thirst: "",
//     bowel: "",
//     urine: "",
//     sleep: "",
//     dreams: "",
//     sweat: "",
//     thermal: "",
//     habits: "",
//     menstrual: "",
//     mentalSymptoms: "",
//     remarks: "",
//     doctorObservations: "",
//     prescription: "",
//     faceImage: null,
//   });

//   useEffect(() => {
//     if (caseData) {
//       setFormData({
//         ...caseData,
//         faceImage: null, // Prevent sending existing image if not changed
//       });
//     }
//   }, [caseData]);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: files ? files[0] : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const data = new FormData();
//     Object.entries(formData).forEach(([key, value]) => {
//       if (value !== null) data.append(key, value);
//     });

//     if (onSubmit) onSubmit(data); // Parent should handle sending this to backend
//   };

//   return (
//     <form className='case-form' onSubmit={handleSubmit}>
//       <h2>Edit Case Sheet</h2>

//       <input
//         name='name'
//         value={formData.name}
//         onChange={handleChange}
//         placeholder='Name'
//       />
//       <input
//         name='age'
//         value={formData.age}
//         onChange={handleChange}
//         placeholder='Age'
//       />
//       <input
//         name='gender'
//         value={formData.gender}
//         onChange={handleChange}
//         placeholder='Gender'
//       />
//       <input
//         name='maritalStatus'
//         value={formData.maritalStatus}
//         onChange={handleChange}
//         placeholder='Marital Status'
//       />
//       <input
//         name='occupation'
//         value={formData.occupation}
//         onChange={handleChange}
//         placeholder='Occupation'
//       />
//       <input
//         name='address'
//         value={formData.address}
//         onChange={handleChange}
//         placeholder='Address'
//       />
//       <input
//         name='phone'
//         value={formData.phone}
//         onChange={handleChange}
//         placeholder='Phone'
//       />
//       <input
//         name='date'
//         type='date'
//         value={formData.date}
//         onChange={handleChange}
//       />

//       <textarea
//         name='chiefComplaints'
//         value={formData.chiefComplaints}
//         onChange={handleChange}
//         placeholder='Chief Complaints'
//       />
//       <textarea
//         name='history'
//         value={formData.history}
//         onChange={handleChange}
//         placeholder='History'
//       />
//       <textarea
//         name='pastHistory'
//         value={formData.pastHistory}
//         onChange={handleChange}
//         placeholder='Past History'
//       />
//       <textarea
//         name='familyHistory'
//         value={formData.familyHistory}
//         onChange={handleChange}
//         placeholder='Family History'
//       />
//       <input
//         name='appetite'
//         value={formData.appetite}
//         onChange={handleChange}
//         placeholder='Appetite'
//       />
//       <input
//         name='cravings'
//         value={formData.cravings}
//         onChange={handleChange}
//         placeholder='Cravings'
//       />
//       <input
//         name='thirst'
//         value={formData.thirst}
//         onChange={handleChange}
//         placeholder='Thirst'
//       />
//       <input
//         name='bowel'
//         value={formData.bowel}
//         onChange={handleChange}
//         placeholder='Bowel'
//       />
//       <input
//         name='urine'
//         value={formData.urine}
//         onChange={handleChange}
//         placeholder='Urine'
//       />
//       <input
//         name='sleep'
//         value={formData.sleep}
//         onChange={handleChange}
//         placeholder='Sleep'
//       />
//       <input
//         name='dreams'
//         value={formData.dreams}
//         onChange={handleChange}
//         placeholder='Dreams'
//       />
//       <input
//         name='sweat'
//         value={formData.sweat}
//         onChange={handleChange}
//         placeholder='Sweat'
//       />
//       <input
//         name='thermal'
//         value={formData.thermal}
//         onChange={handleChange}
//         placeholder='Thermal'
//       />
//       <input
//         name='habits'
//         value={formData.habits}
//         onChange={handleChange}
//         placeholder='Habits'
//       />
//       <input
//         name='menstrual'
//         value={formData.menstrual}
//         onChange={handleChange}
//         placeholder='Menstrual'
//       />
//       <textarea
//         name='mentalSymptoms'
//         value={formData.mentalSymptoms}
//         onChange={handleChange}
//         placeholder='Mental Symptoms'
//       />
//       <textarea
//         name='remarks'
//         value={formData.remarks}
//         onChange={handleChange}
//         placeholder='Remarks'
//       />
//       <textarea
//         name='doctorObservations'
//         value={formData.doctorObservations}
//         onChange={handleChange}
//         placeholder='Doctor Observations'
//       />
//       <textarea
//         name='prescription'
//         value={formData.prescription}
//         onChange={handleChange}
//         placeholder='Prescription'
//       />

//       <label>Upload Face Image (if changing):</label>
//       <input
//         type='file'
//         name='faceImage'
//         accept='image/*'
//         onChange={handleChange}
//       />

//       <button type='submit'>Update Case</button>
//     </form>
//   );
// };

// export default EditCaseForm;
