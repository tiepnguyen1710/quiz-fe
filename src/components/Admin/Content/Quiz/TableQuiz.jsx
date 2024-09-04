import { useEffect, useState } from "react"
import { getAllQuiz } from "../../../../services/apiService";


const TableQuiz = (props) => {
    const {listQuiz} = props
    return (
        <>
            
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Difficulty</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listQuiz && listQuiz.length > 0 &&
                        listQuiz.map((quiz, index) => {
                            return (
                                <tr key={index}>
                                    <td>{quiz.id}</td>
                                    <td>{quiz.name}</td>
                                    <td>{quiz.description}</td>
                                    <td>{quiz.difficulty}</td>
                                    <td>
                                        <button className="btn btn-warning mx-3" onClick={() => {props.handleBtnUpdate(quiz)}}>Update</button>
                                        <button className="btn btn-danger" >Delete</button>
                                    </td>
                                </tr>
                            )
                        })}

                </tbody>
            </table>
        </>
    )
}

export default TableQuiz