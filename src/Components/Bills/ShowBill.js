import React from "react";
import { useSelector } from "react-redux";
import PrintBill from "./PrintBill";
import html2pdf from 'html2pdf.js'


const ShowBill = (props) => {
  const { handleShow, bill, customerInfo } = props;

  const user = useSelector(state=>state.user.data)

  const products = useSelector(state=>state.products.data)


  const handleDownload = () => {
    var element = document.getElementById('bill-info');
    var opt = {
      margin: 1,
      filename: 'bill.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().from(element).set(opt).save();
  }



  return (
    <div className="popUpWrap">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              Bill details
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleShow}
            ></button>
          </div>
          <div className="modal-body">
            <PrintBill user={user} products={products} customerInfo={customerInfo} bill={bill} />
            <button className="btn btn-success" onClick={handleDownload}>Download Bill</button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowBill