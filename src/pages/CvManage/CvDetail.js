import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { changeSttCv, getDetailCv, getDetailCvUser, getListCv, getListCvUser } from "../../services/cvService";


import { getDetailJob } from "../../services/jobService";

import Goback from "../../Components/Goback";

import { getCookie } from "../../helpers/cookies";



import {
 
  Row,
  Col,

  Card,
 
  Form,
  Input,

  Tag,
} from 'antd';
import {
  PhoneOutlined,
  MailOutlined,
  
  EnvironmentOutlined,

} from '@ant-design/icons';
import Jobitem from "../../Components/Jobitem";
const { TextArea } = Input;





// const { Content } = Layout;
// const { Title } = Typography;

function CvDetail() {
    const [form] = Form.useForm();
    const params = useParams();
    const idCompany = getCookie("id")
    const [cv, setCv] = useState([]);
    const [job, setJob] = useState([]);
    useEffect(() => {
      const fetchApi = async () => {
          const response = await getDetailCv(params.id);
          const responseJob = await getDetailJob(response.idJob);
          if (responseJob) {
              setJob(responseJob);
          }

          const detailCv = await getDetailCvUser(response.idcv);
          if (detailCv) {
              setCv(detailCv);
              form.setFieldsValue(detailCv); // Đổ dữ liệu vào form
          }

          changeSttCv(params.id, { statusRead: true });
      };
      fetchApi();
  }, [params.id, form]);

    // console.log("job",job);
    // console.log("cv",cv);
    // console.log(cv);
    console.log(job);
    
    
    
    return (
        <>
         <Goback />
        {cv ? (<Row>
              <Col style={{marginTop:"20px", marginLeft:"10px"}} span={8}>
              
                               
                                    
                                        <Jobitem  item={job} />
                                   
                             
                           
              </Col>
              <Col span={15}>
              <Form  form={form}
               initialValues={{
                careerObjectives: [{}],
                workExperience: [{}],
                education: [{}],
                skills: [{}],
                awards: [{}],
                certificates: [{}],
                hobbies: [{}],
                
                
              }}
                className='cv'
                layout="vertical"
                style={{ maxWidth: '800px', margin: '0 auto' }}
              
              >
                <Row gutter={16} align="middle">
                  {/* Tên và vị trí ứng tuyển */}
                  <Col span={16}>
                    <div className='personal_item'>
                      <Form.Item
                        name="nameUser"
    
                      >
                        <Input className='border__none personal-info__name' />
                      </Form.Item>
                      <Form.Item
                        name="jobPosition"
    
                      >
                        <Input className='border__none personal-info__position' placeholder={"Vị trí ứng tuyển"} />
                      </Form.Item>
                    </div>
                  </Col>
    
                  {/* Thông tin liên lạc */}
                  <Col span={8}>
                    <div className="personal-info__contact">
                      <div className="contact-item">
                        <PhoneOutlined className="icon" />
                        <Form.Item
                          name="phone"
    
                        >
                          <Input className='border__none personal-info__phone' />
                        </Form.Item>
                      </div>
                      <div className="contact-item">
                        <MailOutlined className="icon" />
                        <Form.Item
                          name="email"
                          rules={[
    
                            { type: 'email', message: 'Email không hợp lệ!' },
                          ]}
                        >
                          <Input className='border__none personal-info__email' />
                        </Form.Item>
                      </div>
                      <div className="contact-item">
                        <EnvironmentOutlined className="icon" />
                        <Form.Item
                          name="address"
    
                        >
                          <Input className='border__none personal-info__address' />
                        </Form.Item>
                      </div>
                    </div>
                  </Col>
                </Row>
    
                {/* Mục tiêu nghề nghiệp - Dynamic List */}
                <div className="section">
                  <h3 className="section-header">Mục tiêu nghề nghiệp</h3>
                  <div className="section-content">
                    <Form.List name="careerObjectives">
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(({ key, name, fieldKey, ...restField }) => (
                            <Row key={key} gutter={16} align="middle">
                              <Col span={20}>
                                <Form.Item
                                  {...restField}
                                  name={[name, 'objective']}
                                  fieldKey={[fieldKey, 'objective']}
    
                                >
                                  <TextArea className='border__none' rows={3} placeholder="Mô tả mục tiêu nghề nghiệp của bạn" />
                                </Form.Item>
                              </Col>
                             
                            </Row>
                          ))}
    
                         
                        </>
                      )}
                    </Form.List>
                  </div>
                </div>
    
                {/* Kinh nghiệm làm việc - Dynamic List */}
                <div className="section">
                  <h3 className="section-header">Kinh nghiệm làm việc</h3>
                  <div className="section-content">
                    <Form.List name="workExperience">
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(({ key, name, fieldKey, ...restField }) => (
                            <div key={key} >
                              <Row gutter={16} align="middle">
                                <Col span={10}>
                                  <Form.Item
                                    {...restField}
                                    name={[name, 'companyName']}
                                    fieldKey={[fieldKey, 'companyName']}
    
    
                                  >
                                    <Input className='border__none' placeholder="Tên công ty" />
                                  </Form.Item>
                                </Col>
                                <Col span={10}>
                                  <Form.Item
                                    {...restField}
                                    name={[name, 'jobTitle']}
                                    fieldKey={[fieldKey, 'jobTitle']}
    
    
                                  >
                                    <Input className='border__none' placeholder="Vị trí công việc" />
                                  </Form.Item>
                                </Col>
                              
                              </Row>
                              <Row gutter={16} align="middle">
                                <Col span={10}>   <Form.Item
                                  {...restField}
                                  name={[name, 'jobDuration']}
                                  fieldKey={[fieldKey, 'jobDuration']}
    
    
                                >
                                  <Input className='border__none' placeholder="Bắt đầu - Kết thúc" />
                                </Form.Item></Col>
                                <Col span={10}>
                                  <Form.Item
                                    {...restField}
                                    name={[name, 'jobDescription']}
                                    fieldKey={[fieldKey, 'jobDescription']}
    
                                  >
                                    <TextArea className='border__none' rows={3} placeholder="Mô tả kinh nghiệm làm việc của bạn" />
                                  </Form.Item></Col>
                              </Row>
    
    
    
                            </div>
                          ))}
    
                         
                        </>
                      )}
                    </Form.List>
                  </div>
                </div>
    
                {/* Học vấn - Dynamic List */}
                <div className="section">
                  <h3 className="section-header">Học vấn</h3>
                  <div className="section-content">
                    <Form.List name="education">
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(({ key, name, fieldKey, ...restField }) => (
                            <div key={key}>
                              <Row gutter={16} align="middle">
                                <Col span={10}>
                                  <Form.Item
                                    {...restField}
                                    name={[name, 'educationPeriod']}
                                    fieldKey={[fieldKey, 'educationPeriod']}
    
    
                                  >
                                    <Input className='border__none' placeholder="Bắt đầu - Kết thúc" />
                                  </Form.Item>
                                </Col>
                                <Col span={10}>
                                  <Form.Item
                                    {...restField}
                                    name={[name, 'educationSchool']}
                                    fieldKey={[fieldKey, 'educationSchool']}
    
    
                                  >
                                    <Input className='border__none' placeholder="Tên trường học" />
                                  </Form.Item>
                                </Col>
                             
                              </Row>
                              <Form.Item
                                {...restField}
                                name={[name, 'educationField']}
                                fieldKey={[fieldKey, 'educationField']}
    
                              >
                                <Input className='border__none' placeholder="Ngành học / Môn học" />
                              </Form.Item>
                            </div>
                          ))}
    
                         
                        </>
                      )}
                    </Form.List>
                  </div>
                </div>
    
                {/* Kỹ năng - Dynamic List */}
    
    
                {/* Danh hiệu - Dynamic List */}
                <Row gutter={20}>
                  <Col span={7}>
                    <div className="section">
                      <h3 className="section-header">Danh hiệu</h3>
                      <div className="section-content">
                        <Form.List name="awards">
                          {(fields, { add, remove }) => (
                            <>
                              {fields.map(({ key, name, fieldKey, ...restField }) => (
                                <Row key={key} gutter={16} align="middle">
                                  <Col span={24}>
                                    <Form.Item
                                      {...restField}
                                      name={[name, 'awardPeriod']}
                                      fieldKey={[fieldKey, 'awardPeriod']}
    
    
                                    >
                                      <Input className='border__none' placeholder="Bắt đầu - Kết thúc" />
                                    </Form.Item>
                                  </Col>
                                  <Col span={24}>
                                    <Form.Item
                                      {...restField}
                                      name={[name, 'awardName']}
                                      fieldKey={[fieldKey, 'awardName']}
    
    
                                    >
                                      <Input className='border__none' placeholder="Tên danh hiệu" />
                                    </Form.Item>
                                  </Col>
                                
                                </Row>
                              ))}
    
                             
                            </>
                          )}
                        </Form.List>
                      </div>
                    </div>
    
                  </Col>
                  <Col span={7}><div className="section">
                    <h3 className="section-header">Chứng chỉ</h3>
                    <div className="section-content">
                      <Form.List name="certificates">
                        {(fields, { add, remove }) => (
                          <>
                            {fields.map(({ key, name, fieldKey, ...restField }) => (
                              <Row key={key} gutter={16} align="middle">
                                <Col span={24}>
                                  <Form.Item
                                    {...restField}
                                    name={[name, 'certificatePeriod']}
                                    fieldKey={[fieldKey, 'certificatePeriod']}
    
                                  >
                                    <Input className='border__none' placeholder="Bắt đầu - Kết thúc" />
                                  </Form.Item>
                                </Col>
                                <Col span={24}>
                                  <Form.Item
                                    {...restField}
                                    name={[name, 'certificateName']}
                                    fieldKey={[fieldKey, 'certificateName']}
    
    
                                  >
                                    <Input className='border__none' placeholder="Tên chứng chỉ" />
                                  </Form.Item>
                                </Col>
                                <Col span={4}>
                                  
                                </Col>
                              </Row>
                            ))}
    
                          </>
                        )}
                      </Form.List>
                    </div>
                  </div></Col>
                  <Col span={7}> <div className="section">
                    <h3 className="section-header">Các kỹ năng</h3>
                    <div className="section-content">
                      <Form.List name="skills">
                        {(fields, { add, remove }) => (
                          <>
                            {fields.map(({ key, name, fieldKey, ...restField }) => (
                              <Row key={key} gutter={16} align="middle">
                                <Col span={24}>
                                  <Form.Item
                                    {...restField}
                                    name={[name, 'skillName']}
                                    fieldKey={[fieldKey, 'skillName']}
    
    
                                  >
                                    <Input className='border__none' placeholder="Tên kỹ năng" />
                                  </Form.Item>
                                </Col>
                                <Col span={24}>
                                  <Form.Item
                                    {...restField}
                                    name={[name, 'skillDescription']}
                                    fieldKey={[fieldKey, 'skillDescription']}
    
                                  >
                                    <TextArea className='border__none' rows={1} placeholder="Mô tả kỹ năng" />
                                  </Form.Item>
                                </Col>
                                <Col span={4}>
                                  
                                </Col>
                              </Row>
                            ))}
    
                           
                          </>
                        )}
                      </Form.List>
                    </div>
                  </div></Col>
    
                </Row>
    
                {/* Chứng chỉ - Dynamic List */}
    
    
                {/* Sở thích - Dynamic List */}
    
    
                {/* Nút submit */}
              
              </Form></Col>
            </Row>):(<></>)}
           
            
               
            
           



            


        </>
    )
}
export default CvDetail