import React from 'react';
import {format} from 'date-fns'

export default props => (
  <table className="table" >
    <thead className="text-center"  style={{ cursor: "pointer" }}>
      <tr>
        <th onClick={props.onSort.bind(null, "name")}>
          Имя {props.sortField === "name" ? <small>{props.sort}</small> : null}
        </th>
        <th onClick={props.onSort.bind(null, "date")}>
          Первый полёт{" "}
          {props.sortField === "date" ? <small>{props.sort}</small> : null}
        </th>
        <th onClick={props.onSort.bind(null, "days")}>
          Дней в космосе{" "}
          {props.sortField === "days" ? <small>{props.sort}</small> : null}
        </th>
        <th onClick={props.onSort.bind(null, "mission")}>
          Название миссии{" "}
          {props.sortField === "mission" ? <small>{props.sort}</small> : null}
        </th>
        <th onClick={props.onSort.bind(null, "isMultiple")}>
          Повторные полёты{" "}
          {props.sortField === "isMultiple" ? <small>{props.sort}</small> : null}
        </th>
        <th>
          Удалить
        </th>
      </tr>
    </thead>
    <tbody className="text-left">
          {props.data.map(item =>
              <tr key={item.id}>
            <td>{item.name}</td>
                <td>{(typeof (item.date))!=="number" ? item.days : format(item.date, 'dd-MM-yyyy') }</td>
                <td>{item.days}</td>
            <td>{item.mission}</td>
           <td className="text-center"><input
               name="isGoing"
               type="checkbox"
               checked={item.isMultiple}
                /></td>
                <td><button className="btn btn-outline-danger" onClick={props.onRowSelect.bind(null, item)}>X</button></td>
          </tr>)}
    </tbody>
  </table>
);