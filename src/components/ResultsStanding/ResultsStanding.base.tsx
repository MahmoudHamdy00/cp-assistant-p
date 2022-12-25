
import "bootstrap/dist/css/bootstrap.css";
import React from "react";

export const ResultsStandingBase: React.FunctionComponent = (handlesData: any) => {

  if(handlesData.length === 0){
    return null;
  }
  function rowsJSX (rows:any){
    return rows.map((row:any,index:string)=>{
        return(
            <tr>
                <th scope="row">{index+1}</th>
                <td>{row.handle}</td>
                <td>{row.total}</td>
                {
                  row?.Results&&Object.values(row.Results).map((sheet:any)=>{
                    return <td>{sheet}</td>
                  })
                }
            </tr>
        )
    })
}

function sheetsColumsJSX (){
  let sheets = [];
  sheets.push(<th scope="col">#</th>);
  sheets.push(<th scope="col">Handle</th>);
  sheets.push(<th scope="col">No.Solved</th>);
  if(!handlesData|| handlesData.length===0 || Object.values(handlesData[0]?.Results).length===0){
    return sheets;
  }
  for(let i=0;i<Object.values(handlesData[0]?.Results).length;i++){
    sheets.push(<th scope="col">Sheet {i+1}</th>);
  }
  return sheets;
}

  return (
    <>
      <table className="table" >
        <thead className="thead-light">
          <tr>
            {sheetsColumsJSX()}
          </tr>
        </thead>
        <tbody>
            {rowsJSX(handlesData)}
      </tbody>
      </table>
      
    </>
  );
};
