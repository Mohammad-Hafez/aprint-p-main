import { AiOutlineCheck } from "react-icons/ai";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {AddToCartApi,GetToCart, getProduct, getProductSummery,} from "../store/ContactSlice";
import "primereact/resources/themes/saga-green/theme.css";
import "primereact/resources/primereact.min.css";
import SwiperProducts from "../components/SwiperProducts/SwiperProducts";
import Helmet from "../components/Helmet";
import { Icon } from 'react-icons-kit'
import {xCircle} from 'react-icons-kit/feather/xCircle'
const TestProduct = () => {
  const { id2 } = useParams();
  const [value, setValue] = useState(false);
  const { productArr, summeryArr } = useSelector((state) => state.ContactSlice);
  const dispatch = useDispatch();
  const [widthError, setWidthError] = useState(false);
  const [heightError, setheightError] = useState(false);
  const [SubOption, setSubOption] = useState(null);
  const [SubOptionTwo, setSubOptionTwo] = useState(null);
  const [GetOptionName, setGetOptionName] = useState(null);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  const [MainSections, setMainSections] = useState()

  useEffect(() => {
    if (value === false) {
      setValue(true);
      dispatch(getProduct(id2)).unwrap().then((res) => {
        setMaxQuanity(res.data.max_q);
        setMinQuanity(res.data.min_q);
          setHeadersId(res.data.headers[0]?.id);
          setWidth(`${res.data.def_width}`);
          setHeight(`${res.data.def_height}`);
          setLimit(`${res.data.limit}`);
        });
      dispatch(getProductSummery(`?product_id=${id2}&width=${100}&height=${100}&quantity=${ quantity ? quantity : 1}&limit=${limit}`));
    }
  }, [dispatch, id2, value]);

  useEffect(()=>{
    if (productArr) {
      setMainSections(productArr.sections)
    }
  },[])
  const [selected_op, setSelected] = useState([{
      section_id: 0,
      Option_id: 0,
      parent_id: 0,
    },
  ]);
  const [quantity, setQuantity] = useState();
  const All_ids = selected_op.filter((ele) => ele.Option_id !== 0).map((ele) => ele.Option_id);

  const SendDataOption = (OP_data) => {
    const Last_send_Ids = OP_data.filter((ele) => ele.Option_id !== 0).map((ele) => ele.Option_id);
    let FinalData = [];
    for (let i = 0; i <= Last_send_Ids.length; i++) {
      if (Last_send_Ids[i] !== undefined) {
        FinalData = [...FinalData, `options[${i}]=${Last_send_Ids[i]}&`];
      }
    }
    dispatch( getProductSummery(`?product_id=${id2}&${FinalData.toString().replace( /,/g, "" )}&width=${width}&height=${height}&quantity=${quantity ? quantity : 1}` ));
  };

  const [Order_name, setOrderName] = useState(""); // Define and initialize the Order_name state
  const [uploadedFilesCount, setUploadedFilesCount] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const navigate = useNavigate();

  const AddToCart = () => {
    const data = new FormData();
    data.append("product_id", id2);
    data.append("quantity", quantity);
    data.append("width", width);
    data.append("height", height);
    data.append("Order_name", Order_name);

    // Append each option from All_ids to the FormData
    All_ids.forEach((option, index) => {
      data.append(`options[${index}]`, option);
    });
    // Append the uploaded files to the FormData
    selectedFiles.forEach((file, index) => {
      data.append(`Files[${index}]`, file);
    });

    if (
      !localStorage.getItem("ut") ||
      localStorage.getItem("ut") === "undefined"
    ) {
      navigate("/login");
    } else {
      dispatch(AddToCartApi(data))
        .unwrap()
        .then(() => {
          dispatch(GetToCart());
        });
    }
  };

  const [HeadersId, setHeadersId] = useState(null);
  let today = new Date();
  let tomorrow = new Date(today.setDate(today.getDate() + 3));
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };

  const myToast = useRef(null);

  const showError = (severityValue, summaryValue, detailValue) => {
    myToast.current.show({
      severity: severityValue,
      summary: summaryValue,
      detail: detailValue,
    });
  };
  const updateFilesParameter = (count) => {
    let FinalData = [];
    for (let i = 0; i <= All_ids.length; i++) {
      if (All_ids[i] !== undefined) {
        FinalData = [...FinalData, `options[${i}]=${All_ids[i]}&`];
      }
    }
    dispatch(getProductSummery(`?product_id=${id2}&${FinalData.toString().replace(/,/g, "")}&width=${width}&height=${height}&quantity=${quantity ? quantity : 1}&files=${count}`));
  }

  const sendFiles = (e) => {
    const files = e.target.files;
    if (files.length > 10) {
      showError("error", "Error Message", "You can only upload a maximum of 10 files.");
      e.target.value = null;
      return;
    }
    // Preserve the old files and add the newly uploaded files
    const newFiles = [...selectedFiles, ...files];
    setSelectedFiles(newFiles);
    setUploadedFilesCount(newFiles.length);
    updateFilesParameter(newFiles.length);
    let FinalData = All_ids.map((id, i) => (id !== undefined ? `options[${i}]=${id}&` : ""));
    dispatch(getProductSummery(`?product_id=${id2}&${FinalData.toString().replace(/,/g, "")}&width=${width}&height=${height}&quantity=${quantity ? quantity : 1}&files=${newFiles.length}`));
    e.target.value = null;
  };

  const handleDeleteFile = (indexToDelete) => {
    const updatedFiles = selectedFiles.filter((file, index) => index !== indexToDelete);
    setSelectedFiles(updatedFiles);
    setUploadedFilesCount(updatedFiles.length);
    updateFilesParameter(updatedFiles.length);
  };

  const handleDeleteAllFiles = () => {
    setSelectedFiles([]);
    setUploadedFilesCount(0);
    updateFilesParameter(0); // Call the function with 0
  };

  const handelSupOptionSelect = (e , item) =>{
    if (GetOptionName?.length > 1) {
      setGetOptionName(null)
    }
    e.stopPropagation();
    setSubOptionTwo(item);
      const Option_data ={ 
          section_id:parseFloat(item.section_id),
          Option_id:parseFloat( item.id ),
          parent_id:parseFloat(item.parent_id),
        };
      if (selected_op.indexOf(Option_data ) ===-1 ) {
        const old_selected = selected_op.filter((op ) => parseFloat( op.parent_id ) !== parseFloat(item.parent_id ));
        const New_selected =[
            ...old_selected,
            Option_data,
          ];
        setSelected( New_selected );
        if (All_ids.length <= 0 ) {
          dispatch(getProductSummery(`?product_id=${id2}&options[0]=${parseFloat(  item.id, parseFloat( item.id ) )}&width=${width}&height=${height}&quantity=${quantity ? quantity : 1}` ) );
        } else {
          SendDataOption(  New_selected );
        }
      }
    }
  const handleThirdSupOption = (e , ele)=>{
      e.stopPropagation();
      const Option_data = {
          section_id:parseFloat( ele.section_id ),
          Option_id: parseFloat( ele.id),
          parent_id:parseFloat( ele.parent_id ),
        };
      if (selected_op.indexOf( Option_data) ===-1) {
        const old_selected =selected_op.filter((op ) => parseFloat( op.parent_id ) !== parseFloat(ele.parent_id));
        const New_selected =[
            ...old_selected,
            Option_data,
          ];
        setTimeout(() => {setSelected(New_selected);
          if (All_ids.length <=0) {
            dispatch( getProductSummery(`?product_id=${id2}&options[0]=${parseFloat(ele.id )}&width=${width}&height=${height}&quantity=${quantity ?quantity : 1}`) );
          } else {
            SendDataOption(New_selected );
          }
        }, []);
      }
    }
    const handelSetWidth = (e)=>{
      setWidth(e.target.value);
      if (e.target.value < productArr?.min_width) {
        setWidthError(true);
      } else if (e.target.value > productArr?.max_width) {
        setWidthError(true);
      } else {
        setWidthError(false);
        let FinalData = [];
        for (let i = 0; i <= All_ids.length; i++) {
          if (All_ids[i] !== undefined) {
            FinalData = [
              ...FinalData,
              `options[${i}]=${All_ids[i]}&`,
            ];
          }
        }
        dispatch(getProductSummery(`?product_id=${id2}&${FinalData.toString().replace(/,/g,"" )}&width=${e.target.value}&height=${height}&quantity=${quantity ? quantity : 1}`));
        }
    }

    const handelSetHieght = (e) => {
      setHeight(e.target.value);
      if (e.target.value < productArr?.min_height) {
        setheightError(true);
      } else if ( e.target.value > productArr?.max_height ) {
        setheightError(true);
      } else {
        setheightError(false);
        let FinalData = [];
        for (let i = 0; i <= All_ids.length; i++) {
          if (All_ids[i] !== undefined) {
            FinalData = [
              ...FinalData,
              `options[${i}]=${All_ids[i]}&`,
            ];
          }
        }
        dispatch(getProductSummery(`?product_id=${id2}&${FinalData.toString().replace(/,/g,"" )}&width=${width}&height=${e.target.value}&quantity=${quantity ?quantity : 1}`));
      }
    }
    const [MaxQuanity, setMaxQuanity] = useState(null);
    const [MinQuanity, setMinQuanity] = useState(null);
    const [limit, setLimit] = useState("");
    
    const handelQuantityChange = (e)=>{
      // Parse the input value to an integer
      const newValue = parseInt(e.target.value, 10);
      if (newValue > MaxQuanity) {
        document.querySelector(".limit").style.opacity = 1;  // Hide the <p> element
        setQuantity(MaxQuanity);
        return
      } else if (newValue < MinQuanity) {
        setQuantity(MinQuanity);
        document.querySelector(".limit").style.opacity = 1;
        return
      }else if (isNaN(newValue) ) {
          setQuantity();
          document.querySelector(".limit").style.opacity = 1;
      } else {
        document.querySelector(".limit" ).style.opacity = 0; // Hide the <p> element
        setQuantity(newValue);
      }
    }
  useEffect(() => {
    if (summeryArr) {
      const data = summeryArr.options.slice(1, summeryArr.options.length);
      // console.log("option",GetOptionName);
      // console.log("data indit",data);
      // *FIXME - label in summary
      setGetOptionName(data);
    }
  }, [summeryArr]);
  useEffect(() => {
    let FinalData = [];
    for (let i = 0; i <= All_ids.length; i++) {
      if (All_ids[i] !== undefined) {
        FinalData = [
          ...FinalData,
          `options[${i}]=${All_ids[i]}&`
        ];
      }
    }
    dispatch(getProductSummery(`?product_id=${id2}&${FinalData.toString().replace(/,/g,"")}&width=${width}&height=${height}&quantity=${quantity ? quantity : 1}`)); 
  }, [quantity , width , height ]);
  return (
    <Helmet title={productArr?.meta_title}>
      <meta name="description" content={productArr?.meta_description} />
      <div className="Product_test">
        <div className="container-xxl">
          <div className="row Responsive_row">
            <div className="col-md-8">
            <div className="CardTest">
                    <h1>{productArr?.title}</h1>
                    <div className="Toogelbuttons">
                      {productArr?.headers?.map((ele) => <h2 key={ele.id}onClick={() => {setHeadersId(ele.id);}} className={`${ele.id === HeadersId ? "ToggleActive" : ""} `}style={{ cursor: "pointer" }}>{ele.title}{" "}</h2>)}
                    </div>

                    {productArr?.headers?.map((ele) => <div key={ele.id}style={{display: ele.id === HeadersId ? "block" : "none",}}>
                          <p>{ele.description} </p>
                          <div className="row">
                            {ele.lines.map((ele, idx) =><div className="col-md-6 ProCheck"key={`${ele} ${idx}`} > <AiOutlineCheck /></div>)}
                          </div>
                        </div>
                    )}
                  </div>

            </div>
            <div className="col-md-4">
            {productArr && (
                    <div className="CardTest">
                      <SwiperProducts elements={productArr.images} />
                    </div>
                )}

            </div>
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-12">
                  <div className="CardTest">
                    <h2>Create your order</h2>
                    <div className="row  aLLCenter">
                      <div className="col-md-6">
                      <label htmlFor="Width " className="font-roboto fw-bolder">Width </label>
                        <div className="d-flex align-items-center  cardCenter">
                          <div className="widthInput">
                            <input type="number"value={width} placeholder="Panner Width" onChange={(e) => handelSetWidth(e)} className={`inputNum ${parseInt(width) <= 0 || width.length <= 0? "p-invalid": ""} `} name="Width" id="Width"/>
                          </div>
                          <span className="unit font-roboto">cm</span>
                        </div>
                      </div>
                      <div className="col-md-6">
                      <label htmlFor="Height " className="font-roboto fw-bolder">Height</label>
                        <div className=" d-flex align-items-center cardCenter">
                          <div className="hightInput">
                            <input type="number"value={height} placeholder="Panner Height" onChange={(e) => { handelSetHieght(e) }}className={`inputNum ${parseInt(height) <= 0 || height.length <= 0? "p-invalid": "" } `} name="Height" id="Height"/>
                          </div>
                          <span className="unit font-roboto">cm</span>
                        </div>
                      </div>
                      {widthError || heightError ? (
                        <div className="col-12">
                          <p className="Dimenstion_error">
                            Maximum dimensions of a single piece:{" "}
                            {productArr?.max_width}x{productArr?.max_height} cm. Larger sizes are joined by vertical pieces welded by
                            high frequency with a 2 cm overlap, and may have the same or different sizes depending on the final dimensions of the piece and its relationship with a
                            streamlined printing process. Minimum dimensions of a single piece: {productArr?.min_width}x{productArr?.min_height} cm.{" "}
                          </p>
                        </div>
                      ) : ("")}
                      <div className="col-12">
                        <div className="row">
                          {productArr?.sections?.map((ele) => {
                            return (
                              <div className="col-12" key={ele.id}>
                                <div className="row">
                                  <div className="col-12 font-roboto">
                                    <label htmlFor="Height" className="fw-bold fs-5">{ele.name} </label>
                                  </div>
                                  <div className="col-12">
                                    <div className="row">
                                      {ele.options?.map((e) => {
                                        return (
                                          <div className="col-md-12" key={e.id}>
                                            <div className="row cardCenter">
                                              <div className="col-md-12 border-bottom py-2 rounded shadow-sm my-1 main-border">
                                                <div className="mb-3" onClick={() => {
                                                    setSubOption(e);
                                                    const Option_data = {
                                                      section_id: parseFloat(e.section_id),
                                                      Option_id: parseFloat(e.id),};
                                                    if (selected_op.indexOf(Option_data) === -1) {
                                                      const old_selected =selected_op.filter((op) =>parseFloat(op.section_id) !==parseFloat( e.section_id));
                                                      const New_selected = [...old_selected,Option_data];
                                                      setSelected(New_selected);
                                                      if (All_ids.length <= 0) {
                                                        dispatch(getProductSummery(`?product_id=${id2}&options[0]=${parseFloat(e.id)}&width=${width}&height=${height}&quantity=${quantity ?quantity : 1}`));
                                                      } else {
                                                        SendDataOption( New_selected);
                                                      }
                                                    }
                                                  }}
                                                >
                                                  {e.image ? (<>
                                                      <div className="Card_Image Chose rounded"style={{border:All_ids.includes(e.id)? "3px solid #0a3565": "1px solid #d1d1d1" }}>
                                                        <div className="ImageTesetCon">
                                                          <img src={e.image}alt=""/>
                                                        </div>
                                                        <h3 className="fw-bold fs-6 text-capitalize">{e.name}</h3>
                                                      </div>
                                                      <p>{e.description}</p>
                                                    </>
                                                  ) : ( <>
                                                      <div className="Chose text-center"style={{border:All_ids.includes(e.id)? "3px solid #0a3565": "1px solid #d1d1d1" }}>
                                                        <h3 className="fw-bold fs-6 text-capitalize">{e.name}</h3>
                                                      </div>
                                                      <p > {e.description}</p>
                                                    </>
                                                  )}
                                                  {SubOption ? ( e.id === SubOption.id ? (
                                                      <div className="row mx-3">
                                                        {SubOption ? (
                                                          <div className="row">
                                                            {SubOption.childrens.map( (item , index) => {
                                                                return (
                                                                  <div key={index} className="col-12 rounded ms-3 p-2 my-2 border shadow-sm">
                                                                    <div className="">
                                                                      <label className="fw-bold fs-6 font-roboto">{item.name}</label>
                                                                      <div className="row">
                                                                        {item.childrens.map((item , index) => {
                                                                            return (
                                                                              <div key={ index} className="col-12 my-1"style={{ textAlign:"center", borderColor: All_ids.includes(item.id)? "#d1d1d1": "#d1d1d10a3565"}}>
                                                                                <div className="text-start" onClick={(e) => {handelSupOptionSelect(e , item)}}>
                                                                                  {item.image ? ( <>
                                                                                      <div className="Card_Image Chose rounded" style={{ border:All_ids.includes(item.id)? "3px solid #0a3565": "1px solid #d1d1d1" }}>
                                                                                        <img src={ item.image} alt="" width={ 100 } height={ 100  } />
                                                                                        <h3 className="mt-2 mb-1 fw-bold fs-6 text-capitalize"> {item.name}</h3>
                                                                                      </div>
                                                                                    </>
                                                                                  ) : (<>
                                                                                      <div className="Chose text-center " style={{border:All_ids.includes(item.id)? "3px solid #0a3565": "1px solid #d1d1d1"  }}> 
                                                                                        <h3 className="fw-bold fs-6 text-capitalize">{ item.name}</h3>
                                                                                      </div>
                                                                                    </>
                                                                                  )}
                                                                                  {/* *********************** */}
                                                                                  <div className="row my-2 mx-3">
                                                                                    {SubOptionTwo && SubOptionTwo.id === item.id ? <>
                                                                                        {SubOptionTwo.childrens.map(( element , index) => {
                                                                                          return (<div key={index}>
                                                                                            <label className="w-auto position-relative pe-0 fs-6 fw-bold font-roboto">{element.name}</label>
                                                                                            <div className="row p-0 m-0">
                                                                                            {element.childrens?.map((ele , index) =>{
                                                                                              return <>
                                                                                                <div className="col-12 mb-1" key={index} style={{ textAlign:"center", borderColor: All_ids.includes(ele.id)? "#d1d1d1": "#d1d1d10a3565"}} onClick={(e) => {handleThirdSupOption(e , ele)}}>
                                                                                                  {ele.image?<>
                                                                                                    <div className="Card_Image Chose mb-2 rounded" style={{ border:All_ids.includes(ele.id)? "3px solid #0a3565": "1px solid #d1d1d1"  }}>
                                                                                                        <img src={ele.image}alt="" width={100} height={ 100}/>
                                                                                                        <h3 className="mt-2 mb-1 text-capitalize fw-bold fs-6">{ele.name }</h3>
                                                                                                      </div>
                                                                                                  </>:<>
                                                                                                  <div className="Chose text-capitalize text-capitalize fw-bold fs-6" style={{ textAlign:"left", border:All_ids.includes(ele.id)? "3px solid #0a3565": "1px solid #d1d1d1" }}>
                                                                                                    <h3 className="fw-bold fs-6 text-capitalize text-center">{ele.name}</h3>
                                                                                                  </div>
                                                                                                  </>}
                                                                                                </div>
                                                                                              </>
                                                                                            })}
                                                                                            </div>
                                                                                              </div>
                                                                                            );
                                                                                          }
                                                                                        )}
                                                                                    </> : null}
                                                                                  </div>
                                                                                </div>
                                                                              </div>
                                                                            );
                                                                          }
                                                                        )}
                                                                      </div>
                                                                    </div>
                                                                  </div>
                                                                );
                                                              }
                                                            )}
                                                          </div>
                                                        ) : null}
                                                      </div>
                                                    ) : null
                                                  ) : null}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="row cardCenter">
                          <div className="col-md-6">
                            <label htmlFor="Height ">Quantity</label>
                            <input type="number" min={MinQuanity} max={MaxQuanity} value={quantity} onChange={(e) => {handelQuantityChange(e)}}/>
                            <p className="limit">Please Select a Quantity Between {MinQuanity} as a Minimum Quantity & {MaxQuanity} as a Maximum Quantity</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="btn-fils">                  
                    <label className="btn-upload mt-0">
                      Upload
                      <input  type="file" multiple={true} className="file-input" onChange={(e) => sendFiles(e)}/>
                    </label>
                    <button className="btn-delete" onClick={handleDeleteAllFiles}>
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div style={{ height: "100%"}}>

                <div className="order_now">
                  {summeryArr && (
                    <div className="CardTest "> <h2 className="mb-3">Order Summary</h2> <div>
                        <div className="d-flex flex-wrap">
                          <h5 className="font-quest fw-bolder">{summeryArr.options.length > 0 ? summeryArr.options[0].section + " : ": null}{" "}</h5>
                          <span>{summeryArr.options.length > 0 ? summeryArr.options[0].name : null}</span>
                          {GetOptionName ? GetOptionName.map((item , index) => { return (<h5 key={index} className="font-quest d-block"><span className="fw-bolder fs-5">{item.parent_name} : </span> {<span>{item.name}</span>}</h5>);}): null}
                        </div>
                      </div>
                      <div className="d-flex">
                        <h5 className="font-quest fw-bolder">Quantity:</h5>
                        <span> {summeryArr.quantity}</span>
                      </div>
                      {uploadedFilesCount > 0 ? <>
                          <h5 className="text-dark font-Rowdies">Uploaded Files Count: <span className="text-muted fw-normal">{uploadedFilesCount}</span> </h5>
                          {selectedFiles?.map( (file , index) => <div className="fielsContainer d-flex align-items-center">
                          <h5 className="mb-1 text-dark font-quest fw-bolder" key={index}>File name : <span className="text-muted fw-normal">{file.name}</span> </h5>
                          <Icon className="text-danger delBtn ms-3 cursor-pointer" icon={xCircle} onClick={(e)=>handleDeleteFile(index)}/>
                          </div> 
                          )}
                      </>
                      : 
                      null}   
                      <div className="d-flex ">
                        <h5 className="font-quest fw-bolder">Arrive on:</h5>
                        <span>{tomorrow.toLocaleDateString("en-US", options)} </span>
                      </div>
                      <div className="d-flex align-items-center font_grow_div ">
                        <h5 className="font_grow font-quest fw-bolder">Total:</h5>
                        <span className="span_active">{" "}{summeryArr.total.toFixed(2)} &euro;</span>
                      </div>
                      <div className="mb-4 Order_name">
                        <label htmlFor="Order_name font-quest fw-bolder">Order name </label>
                        <input type="text" onChange={(e) => {setOrderName(e.target.value);}}className={`${parseInt(Order_name) <= 0 || Order_name.length <= 0? "p-invalid": ""} `}name="Order_name"id="Order_name"/>
                      </div>
                      <button className="AddToCartBtn"onClick={() => {AddToCart();}}>Add To Cart</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {productArr && ( <div className="article_body"id={"artContent"}dangerouslySetInnerHTML={{__html: productArr?.footers.description}}></div>)}
        </div>
      </div>
    </Helmet>
  );
};
export default TestProduct;