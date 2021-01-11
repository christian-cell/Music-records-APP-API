import React, { useEffect, useState } from 'react';
import './Records.scss';
import Banner from '../../shared/components/Banner';
import { API } from '../../shared/servicios/Api';
import FilterRecord from '../filterRecord/FilterRecord';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';


export default function Records() {


  // const [isLogged, setIsLogged] = useState(!!localStorage.getItem('token'))


  const [records, setRecords] = useState([]);
  // const [recordByStyle, setRecordByStyle] = useState([])
  useEffect(() => {
    API.get('records').then(res => {
      //   console.log(res.data);
      setRecords(res.data)
    })
  }, [])

  console.log(records)


  const onSubmit = e => {
    e.preventDefault();
    console.log('le diste al boton');
    const infoForm = document.getElementById('recordsForm');
    const formData = new FormData(infoForm);

    API.post('records/userPost', formData).then(res => {
      console.log('record added successfully');
      window.location.href = "/records"
    })
  }



  // console.log(records._id)

  function deleteRecord(id) {
    console.log('le diste al boton de borrado', id);
    API.delete('records/delete/' + id).then(res => {
      console.log('record deleted successfully');
      window.location.href = "/records"
    })
  }

  const getDetail = (id) => {

    API.get('/records/' + id).then(res => {
      console.log(res.data);
    })


  }

  const filterByStyle = e => {
    e.preventDefault();
    var style = e.target.name;

    API.get('/records/getByStyle/' + style).then(res => {
      console.log(res.data);
      setRecords(res.data)
    })

  }

  console.log(records)

  return (
    <div className="records-main-container" >

      <div
        className="records-main-container__records-banner-container">
        <Banner></Banner>
      </div>
      <div>
        <form onSubmit={onSubmit} encType="multipart/form-data" id="recordsForm" >
          <legend> Add new Record </legend>
          <input type="text" name="artist" placeholder="artist" />
          <input type="text" name="style" placeholder="style" />
          <input type="text" name="year" placeholder="year" />
          <input type="file" name="image" />
          <button> Add new Record </button>
        </form>
      </div>





      <div className=" filter-button-container " >
        <div className=" filter-button-container__filter-button-son-container " >
          <button onClick={filterByStyle} name="rock" > Rock </button>
        </div>
        <div className=" filter-button-container__filter-button-son-container " >
          <button onClick={filterByStyle} name="pagode" > Pagode </button>
        </div>
        <div className=" filter-button-container__filter-button-son-container " >
          <button onClick={filterByStyle} name="pop" > Pop </button>
        </div>
      </div>



      <div className="row" style={{ width: '80%', margin: 'auto' }} >
        {records.map((record, i) =>
          <div key={i} className="col-12 col-sm-6 col-lg-4" >
            <div className="records-main-container__unit" >

              <div onClick={() => getDetail(record._id)} id="recordsFather" >

                <div className="records-main-container__record-container">
                  <a href={record.url} className="urlRecords" >
                  <div className="records-main-container__img-container" >
                      <img
                        className="records-main-container__img"
                        src={record.image} alt="Records Images" />
                    </div>
                    <div className="records-main-container__record-container" >
                      <span > {record.artist} </span>
                    </div>
                    <div className="records-main-container__record-container" >
                      <span > {record.record} </span>
                    </div>
                    <div className="records-main-container__record-container" >
                      <span > {record.style} </span>
                    </div>
                    <div className="records-main-container__record-container" >
                      <span > {record.year} </span>
                    </div>

                  </a>
                </div>
              </div>
              {/* <div>
                {record._id}
              </div> */}
              <div>
                <button onClick={() => deleteRecord(record._id)}
                  className="records-main-container__delete-record-button "
                  
                >
                  Delete 
                </button>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  )
}
