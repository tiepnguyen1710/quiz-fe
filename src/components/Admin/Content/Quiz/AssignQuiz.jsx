import Select from "react-select"
import { useState, useEffect } from "react";
import { getAllQuiz, getAllUsers } from "../../../../services/apiService";

const AssignQuiz = () => {
    const [selectQuiz, setSelectedQuiz] = useState({});
    const [listQuiz, setListQuiz] = useState([]);
    const [selectUser, setSelectedUser] = useState({});
    const [listUser, setListUser] = useState([]);

    useEffect(() => {

        fetchListQuiz();
        fetchListUser();

    }, []);

    const fetchListQuiz = async () => {

        const res = await getAllQuiz();
        //console.log(res.DT);

        if (res && res.EC === 0) {
            let newQuiz = res.DT.map((quiz) => {
                return(
                    {
                        value: quiz.id,
                        label: quiz.description
                    }
                )
            })
            setListQuiz(newQuiz);
        }

    }

    const fetchListUser = async () => {

        const res = await getAllUsers();
        //console.log(res.DT);

        if (res && res.EC === 0) {
            let users = res.DT.map((user) => {
                return(
                    {
                        value: user.id,
                        label: `${user.id}-${user.username}-${user.email}`
                    }
                )
            })
            setListUser(users);
        }

    }


    return(
        <div className="assign-user-container row">
            <div className="select-type col-6" style={{zIndex : 2}}>
                <label className="mb-2">Select Quiz</label>
                <Select options={listQuiz} defaultValue={selectQuiz} onChange={setSelectedQuiz}/>
            </div>

            <div className="select-type col-6" style={{zIndex : 2}}>
                <label className="mb-2">Select User</label>
                <Select options={listUser} defaultValue={selectUser} onChange={setSelectedUser} />
            </div>

            <div className="btn-assign mt-3">
                <button className="btn btn-warning">Assign</button>
            </div>
        </div>
    )
}

export default AssignQuiz