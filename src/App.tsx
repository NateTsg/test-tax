import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import response from './response.json';


function App() {
  const [items, setItems ] = useState<any[]>([]);
  useEffect(()=>{
    let tempItems  : any = [];
    response.forEach(item => {
      let category = item.category ? item.category.name : "";
      if(!tempItems[category]){
        tempItems[category] = [item];
      }else{
        tempItems[category].push(item)
      }
      
      
    })
    setItems(tempItems)
  },[response])

  return (
    <div className="App">
      <h1>Add Tax</h1>
    <Formik
      initialValues={{
        name : '',
        rate : 0.0,
        applied_to : null,
        applicable_items: [],
      }}
    
      onSubmit={async (values) => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {({ values, setFieldValue }) => (
        <Form>
           <Field type="name" placeholder="Name" name="name" />
           <ErrorMessage name="name" component="div" />
           <Field type="number" placeholder="Rate"  name="rate" />
           <ErrorMessage name="rate" component="div" />
           <div id="my-radio-group">Applied to : </div>

           <div role="group" aria-labelledby="my-radio-group">
            <label>
              <Field type="radio" name="applied_to" value="all" onChange={() => {
                setFieldValue("applied_to", "all");
                setFieldValue("applicable_items", response.map(item => item.id.toString()))
              }} />
              Apply to all items in collection
            </label>
            <label>
              <Field type="radio" name="applied_to" value="some" />
              Apply to specific items
            </label>
          </div>
          {items && Object.keys(items).map((key : any) => (
            <div>

            <h2>{key}</h2>
              {items[key] && items[key].map((item : any)=> (
                  <label key={item.id}>
                  <Field type="checkbox" name="applicable_items"  value={item.id.toString()} />
                  {item.name}
                </label>
              ))}
          
           </div>
          ))}
          

          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
    </div>
  );
}

export default App;
