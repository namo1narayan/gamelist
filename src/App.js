import axios from 'axios';
import React,{useState,useEffect} from 'react';
import {MDBTable,MDBTableHead,MDBTableBody,MDBRow,MDBCol,MDBContainer,MDBBtn,MDBBtnGroup} from "mdb-react-ui-kit";
import './App.css';

function App() {
  const [data,setData]=useState([]);
  const [value,setValue]=useState("");
  const [sortValue,setSortValue]=useState("");
  const sortOptions =["title","platform","score","genre","editors_choice"];
  useEffect(() =>{
    loadUserData();
  }, []);

  const loadUserData=async () => {
    return await axios
    .get("http://localhost:5000/games")
    .then((response)=>setData(response.data))
    .catch((err)=>console.log(err));
  };
  console.log("data",data);

  const handleReset=() => {
    loadUserData();
  };

  const handlesearch= async(e) => {e.preventDefault();return await axios
    .get(`http://localhost:5000/games?q=${value}`)
  .then((response)=>{
    setData(response.data);
    setValue("");
})
  .catch((err)=>console.log(err));
};

const handleSort= async(e) => {
  let value=e.target.value;
  setSortValue(value);
  return await axios
  .get(`http://localhost:5000/games?_sort=${value}&_order=desc`)
.then((response)=>{
  setData(response.data);
})
.catch((err)=>console.log(err));
};

const handleFilter= async(value) => {
  return await axios
  .get(`http://localhost:5000/games?editors_choice=${value}`)
.then((response)=>{
  setData(response.data);
})
.catch((err)=>console.log(err));
};
  return (
    <MDBContainer>
       <form style={{margin: "auto",padding: "15px",maxWidth: "400px", alignContent: "center", }} className="d-flex input-group w-auto" onSubmit={handlesearch}>

        <input type="text" placeholder="Search..." className="form-control" value={value} onChange={(e) => setValue(e.target.value)}/>

          <MDBBtn type="submit" color="dark">Search</MDBBtn>
          <MDBBtn className="mx-2" color="info" onClick={()=>handleReset()}>Reset</MDBBtn>

</form>
<MDBRow>

<MDBCol size="8">
          <h5>Sort by:</h5>
          <select style={{width: '50%', height: '35px',borderRadius: '2px'}} onChange={handleSort} 
          value={sortValue}>
            <option>Please Select Value</option>
            {sortOptions.map((item,index) =>(
              <option value={item} key={index}>{item}</option>
            ))}
          </select>

        </MDBCol>

        <MDBCol size="4">
          <h5>Filter By Editors Choice:</h5>
          <MDBBtnGroup>
            <MDBBtn color="success" onClick={() =>handleFilter("Y")}>Y</MDBBtn>
            <MDBBtn color="danger" style={{marginLeft:"2px"}} onClick={() =>handleFilter("N")}>N</MDBBtn>
          </MDBBtnGroup>
          </MDBCol>
          </MDBRow>
    <div style={{marginTop:"100px"}} >
      <MDBRow>
      <MDBCol size="12">
        <MDBTable>
          <MDBTableHead dark>
            <tr> 
              <th scope='col'>No.</th>
              <th scope="col">TITLE</th>
              <th scope="col">PLATFORM</th>
              <th scope="col">SCORE</th>
              <th scope="col">GENRE</th>
              <th scope="col">EDITOR CHOICE</th>
            </tr>

          </MDBTableHead>
          {data.length ===0 ? (
            <MDBTableBody className='align-center mb-0'>
              <tr>
                <td colSpan={8} className="text-centre mb=0">No Data Found</td>
              </tr>
            </MDBTableBody>
          ): (
            data.map((item,index)=>(
              <MDBTableBody key={index}>
                <tr>
                  <th scope="row">{index+1}</th>
                  <td>{item.title}</td>
                  <td>{item.platform}</td>
                  <td>{item.score}</td>
                  <td>{item.genre}</td>
                  <td>{item.editors_choice}</td>
                </tr>

              </MDBTableBody>
            ))
          )}
        </MDBTable>
      </MDBCol>
      </MDBRow>
      </div>
      <MDBRow>
        
       
      </MDBRow>
      </MDBContainer>
  );
}

export default App;
