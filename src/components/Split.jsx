import React, { useEffect, useState } from "react";
import './split.css'
import Loader from "./Loader";

function Split({ downloadBill }) {

    const [loader, setLoader] = useState(false)
    const [help, setHelp] = useState(false);
    const [credentials, setCredentials] = useState(true);
    const [splitBill, setSplitBill] = useState(false);
    const [data, setData] = useState([])
    const [peopleNum, setPeopleNum] = useState(0);
    const [billVal, setBillVal] = useState(0);
    const [currentYear, setCurrentYear] = useState('2024');

    const handleHelp = () => {
        if (help === false) {
            setCredentials(false);
            setSplitBill(false);
            setHelp(true)
        } else {
            setCredentials(true);
            setSplitBill(false);
            setHelp(false)
        }
    }

    const handlePeopleNum = (e) => {
        let val = e.target.value;
        val <= 50 ? setPeopleNum(parseFloat(val)) : alert("Max allowed number is 50")
    }

    const generateSplit = () => {
        setLoader(true)
        setCredentials(false);
        setSplitBill(true);
        const splitVal = billVal / peopleNum;
        const data = []
        for (let i = 1; i <= peopleNum; i++) {
            let personName = document.querySelector(`.personName${i}`).value;
            let personPaid = parseFloat(document.querySelector(`.paidbyperson${i}`).value);

            data.push({ name: personName, paid: personPaid - splitVal })
        }
        setData(data)
        setTimeout(() => {
            setLoader(false)
        }, 3000);
    }
    const downloadBillFun = () => {
        downloadBill()
    }

    const getDate = () => {

    }

    useEffect(() => {
        let date = new Date();
        let year = date.getUTCFullYear();

        setCurrentYear(year);
    }, [])


    return (
        <div>
            {loader && <Loader />}
            {/* {help && <Help handleHelp={handleHelp}/>} */}
            {credentials &&
                <div className="credentialscss">
                    <button className="helpButton" onClick={handleHelp}>
                        <span className="entypo--help-with-circle"></span>
                    </button>
                    <div className="credntTitle">Add Credentials</div>
                    <div className="stepOne flex align_item_center">
                        <h4>1</h4>
                        <p>Add bill value </p>
                        <input type="number" value={billVal} onChange={(e) => setBillVal(e.target.value)} />
                    </div>
                    {billVal > 0 &&
                        <div className="stepTwo flex align_item_center">
                            <h4>2</h4>
                            <p>Add number of <br /> people </p>
                            <input type="number" value={peopleNum} onChange={handlePeopleNum} />
                        </div>
                    }
                    {peopleNum > 0 && (
                        <div className="flex_column">
                            <div className="stepThree" disabled>
                                <div className="flex align_item_center stepThreeTitle">
                                    <h4>3</h4>
                                    <p>Bill paid by whom?</p>
                                    <h5>.</h5>
                                </div>
                                <p className="noteText">Note : You can change name of person.</p>
                                <table id="tableId">
                                    <tbody>
                                        {[...Array(peopleNum)].map((_, index) => (
                                            <tr key={index}>
                                                <td className="width_100px"><input type="text" defaultValue={`Person ${index + 1}`} className={`personName${index + 1} width_100px`} /></td>
                                                <td className="width_100px"><input type="text" defaultValue={'0'} className={`paidbyperson${index + 1} width_100px`} /></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <button className="genButton" onClick={generateSplit}>Generate</button>
                        </div>
                    )
                    }
                </div>
            }
            {splitBill &&
                <div className="splitBillcss">
                    <button className="backBtn" onClick={() => { setLoader(false); setCredentials(true); setSplitBill(false); }}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#0053ff" d="M12 3a9 9 0 0 0-9 9H0l4 4l4-4H5a7 7 0 0 1 7-7a7 7 0 0 1 7 7a7 7 0 0 1-7 7c-1.5 0-2.91-.5-4.06-1.3L6.5 19.14A9.1 9.1 0 0 0 12 21a9 9 0 0 0 9-9a9 9 0 0 0-9-9m2 9a2 2 0 0 0-2-2a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2" /></svg></button>
                    <button className="downloadBtn" onClick={downloadBillFun}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 11l5 5l5-5m-5-7v12" /></svg></button>
                    <div className="credntTitle">Bill Split</div>
                    <p>Share in total <span className="text_bold">{peopleNum}</span> people.</p>
                    <p className="displaySplit">Split value of <span className="text_bold">{(billVal / peopleNum).toFixed(2)}</span> per person is generated.</p>
                    <div className="finalOutput">
                        {data.map((item, index) => (
                            // <h2 key={index}>{item.name} {item.paid < 1 ? 'has to pay' : 'has to accept'} {Math.abs(item.paid).toFixed(2)}</h2>
                            <div className="outputBills bg_lightgreen" key={index}>
                                <div className="outputName">
                                    <h4>{item.name}</h4>
                                    <p>{item.paid < 1 ? 'has to pay' : 'has to accept'}</p>
                                </div>
                                {/* <div className="outputBillVal">{Math.abs(item.paid).toFixed(2)}</div> */}
                                <div className={`${item.paid < 1 ? 'color_red' : 'color_green'} outputBillVal`}>{Math.abs(item.paid).toFixed(2)}$</div>
                            </div>
                        ))}
                    </div>
                    <div className="displayTotal">
                        <p>Bill of</p>
                        <h3>{billVal}$</h3>
                    </div>
                </div>
            }
            {help &&
                <div className="splitBillcss">
                    <button className="closeButton" onClick={handleHelp}><span className="carbon--close-filled"></span></button>
                    <section className="helpSection">
                        <div className="credntTitle">Help & Query</div>
                        <h1>FairSplits</h1>
                        <p>FairSplits simplifies the process of dividing expenses among friends or housemates, ensuring everyone pays their fair share effortlessly. Here you can generate and download bill splits without any signup or login.</p>
                    </section>
                    <section className="helpSection">
                        <h3>How to generate bill's split ?</h3>
                        <ol>
                            <li>Add bill value: In this step, you have to enter the total amount of the bill.</li>
                            <li>Add number of people: Here, you need to specify the number of people with whom you want to share or split the bill.</li>
                            <li>Bill paid by whom: Enter the names of the individuals and the amounts they have contributed towards the bill in this step.</li>
                            <li>Finally, click on the generate button to split the bill.</li>
                        </ol>
                    </section>
                    <section className="keyWordSection">
                        <h2>bill split</h2><h2>split bill</h2><h3>splitwise</h3><h3>split bill online calculator</h3><h4> splitwise online</h4><h4>split the bill</h4><h5>bill split calculator</h5><h5>bill split app</h5>
                        <p>Split the bills with ease & without any login / signup / storing data. Share with friends & family with ease.</p>
                    </section>
                </div>
            }
            <div className="flex align_items_center justify_center mar_t_15px">
                © {currentYear} FairSplit. All rights reserved.
            </div>
        </div>
    )
}

export default Split;