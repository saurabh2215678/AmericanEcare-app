<?php
 if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class api extends MX_Controller {

	public function __construct()
	{
		parent::__construct();
		//$this->auth->check_session();
		$this->load->model("doctor");
		$this->load->model("admin/patient_model");
		$this->load->helper("new_helper");
		$this->load->helper("payment_helper");
		//$this->load->library('session');
		$this->load->database();
		$this->load->library('session');
		//$this->load->library('email');
	}
  
public function _remap($method, $params = array())
{
    if(method_exists($this, $method)){
        return call_user_func_array(array($this, $method), $params);
    }
    else
    {
        $method = str_replace("-", "_", $method);
        if(method_exists($this, $method)){
            return call_user_func_array(array($this, $method), $params);
        }
    }
    show_404();
}


function iam_exec_function()
{
	$reg_date=date('d-m-Y',strtotime('14-03-2019 13:32:57')); 
	echo $reg_date;
}

function chk_file()
{
	
		 if(!empty($_FILES['patient_picture']['name']))
			{ 
				$file_name_demographic_picture = $_FILES["patient_picture"]["name"];
				if(@is_uploaded_file($_FILES["patient_picture"]["tmp_name"]))
				 {
 move_uploaded_file($_FILES['patient_picture']['tmp_name'],"./assets/img/".$file_name_demographic_picture);
			     }	

				//$save['demographic_image']  = $file_name_demographic_picture;
		   }
		   else
		   {
		   //	$save['demographic_image']  = '';
		   	$file_name_demographic_picture = '';
		   }


		//$path = "./assets/ios_image/".$filename;


		$data = array(
			"image"=>$file_name_demographic_picture
		);

		$n = $this->db->insert("ios_image",$data);
		if($n==1)
		{
			echo json_encode(array("status"=>'success', "msg"=>'Save success'));
		}
		else
		{
			echo json_encode(array("status"=>'fail', "msg"=>'Save failed'));
	    }
	
		
}


function change_password()
{
	$patient_id = $_POST['patient_id'];
	$old_pass = $_POST['old_password'];
	$new_pass = $_POST['new_password'];
	$confirm_new_pass = $_POST['confirm_new_password'];

	$this->db->where('id',$patient_id);
	$patient_detail = $this->db->get('patient_basic')->row();

	$patient_pass =  $patient_detail->password;

	if($patient_pass == md5($old_pass))
	{	
		if(md5($new_pass) == md5($confirm_new_pass))
		{
			$data['password'] =  md5($new_pass);
			$data['decrypt_password'] =  $new_pass;
			$this->db->where('id',$patient_id);
    		$this->db->update('patient_basic',$data);
    		echo json_encode(array("status"=>'success', "msg"=>'Password Changed Successfully'));
		}
		else
		{
			echo json_encode(array("status"=>'fail', "msg"=>'Entered Password does not match'));
		}
	}

	else
	{
		echo json_encode(array("status"=>'fail', "msg"=>'Old Password does not match'));
	}
}


function forgot_password()
{
	 if($this->input->server('REQUEST_METHOD') === 'POST')
      		  {	
      		  	$username = $this->input->post('email_id');
      		  	//$user=json_encode($username);
				$user = base64_encode($username); 
      		  	$que=$this->db->query("select * from patient_basic where email='".$username."'");
				$row = $que->num_rows();
				$fetch_detail = $que->row();
               if($row>0)
				{
				  $config = Array(
				  'protocol' => 'smtp',
				  'smtp_host' => 'smtp.livemail.co.uk',
				  'smtp_port' => 25,
				  'smtp_user' => 'info@americanecare.com', // change it to yours
				  'smtp_pass' => 'Mustapha@2018', // change it to yours
				  'mailtype' => 'html',
				  'charset' => 'iso-8859-1',
				  'wordwrap' => TRUE
				);

                 	
				  $otp = rand(100000,999999);
			   //echo $encoded;die;
				   $type='doctors';
				   $message="Dear user you receive this email from americanecare because recently you request for reset your password".'<br/>';
				   $message.= "Enter code  ".$otp." for reset your password ";
				 //  $message.="http://americanecare.com/front/home/forgot/$type/$user";
            
			      $this->load->library('email', $config);
			      $this->email->set_newline("\r\n");
			      $this->email->from('info@americanecare.com'); // change it to yours
			      $this->email->to($username);// change it to yours
			      $this->email->subject('Forgot Your Password');
			      $this->email->message($message);
				  $this->email->send();

			     // redirect to mydahboaord
				 $data = array( 
				    'otp_code'      => $otp
				);


				  $this->db->where('email', $username);
				  $this->db->update('patient_basic', $data);



				  echo json_encode(array("status"=>'success', "msg"=>'Email sent successfully'));

				}

				else
				{
					
				  echo json_encode(array("status"=>'fail', "msg"=>'This email id is not exist in our database'));
				}	

				

      		  }
}


function otp_match()
{
	$otp = $this->input->post('otp');
	$email = $this->input->post('email');

	$que=$this->db->query("select * from patient_basic where email='".$email."'");
	$row = $que->num_rows();
	$fetch_detail = $que->row();
	$patient_code = $fetch_detail->otp_code;

	if($otp == $patient_code)
	{
		 echo json_encode(array("status"=>'success', "msg"=>'code is match'));
	}
	else
	{
	 	echo json_encode(array("status"=>'fail', "msg"=>'code is not match'));	
	}
}


function set_password()
{
	$password = md5($this->input->post('password'));
	$de_password = $this->input->post('password');
	$email = $this->input->post('email');

	$data = array( 
	    'password'=> $password,
	    'decrypt_password'=> $de_password
	);

	$this->db->where('email', $email);
	if($this->db->update('patient_basic', $data))
	{
		 echo json_encode(array("status"=>'success', "msg"=>'Password changed successfully'));
	}
	else
	{
	 	echo json_encode(array("status"=>'fail', "msg"=>'Update error'));	
	}
}




function get_patient_detail()
{
	//$b = array();
	$patient_id = $this->input->post('patient_id');

	$this->db->where('id',$patient_id);
	$patient_detail = $this->db->get('patient_basic')->row();
	 
//	echo "<pre>";print_r($patient_detail)   ; 
	
	$country_val = get_country($patient_detail->country);
	$country_name = $country_val[0]->name;
		

	if(!empty($patient_detail->state))
	{
		$state_val = get_state($patient_detail->state);	
		$state_name = $state_val[0]->name;
	}	
	else
	{
		$state_name = "";
	}
		


	if(!empty($patient_detail->city))
	{
		$city_val = get_city($patient_detail->city);
		$city_name = $city_val[0]->name;
	}
	else
	{
		$city_name = '';
	}


	$a['patient_application_no']= $patient_detail->patient_application_no;
	$a['first_name']= $patient_detail->first_name;
	$a['middle_name']= $patient_detail->middle_name;
	$a['last_name']= $patient_detail->last_name;
	$a['dob']= $patient_detail->dob;
	$a['email']= $patient_detail->email;
	$a['address']= $patient_detail->address;
	$a['zone']= $patient_detail->zone;
	$a['zone_name']= get_zone_by_id($patient_detail->zone)->zone;
	
	$a['country']= $patient_detail->country;
	$a['country_name']= $country_name;
	$a['state']= $patient_detail->state;
	$a['state_name']= $state_name;
	$a['city']= $patient_detail->city;
	$a['city_name']= $city_name;
	$a['pincode']= $patient_detail->pincode;
	$a['mobile']= $patient_detail->mobile;



	if(!empty($patient_detail))
	{
		echo json_encode(array("status"=>'success',  "data"=>$a));
	}
	else
	{

	$a['patient_application_no']= '';
	$a['first_name']= '';
	$a['middle_name']= '';
	$a['last_name']= '';
	$a['dob']= '';
	$a['email']= '';
	$a['address']= '';
	$a['zone']= '';
	$a['zone_name']= '';
	
	$a['country']= '';
	$a['country_name']= '';
	$a['state']= '';
	$a['state_name']= '';
	$a['city']= '';
	$a['city_name']= '';
	$a['pincode']= '';
	$a['mobile']= '';

		echo json_encode(array("status"=>'fail',  "data"=>$a));
	}


}

function edit_basic_information()
{	
	$save['id'] = $this->input->post('patient_id');
	$save['first_name'] = $this->input->post('first_name');
	$save['last_name'] = $this->input->post('last_name');
	$save['email'] = $this->input->post('email');
	$save['address'] = $this->input->post('address');
	$save['mobile'] = $this->input->post('mobile');
	$save['country'] = $this->input->post('country');
	$save['state'] = $this->input->post('state');
	$save['city'] = $this->input->post('city');
	$save['pincode'] = $this->input->post('pincode');
	$save['zone'] = $this->input->post('zone');

	$update_basic = $this->patient_model->update_patient_basic($save['id'],$save,'patient_basic');

	if($update_basic == '1')
	{
		$this->db->where('id',$save['id']);
		$patient_demographic = $this->db->get('patient_basic')->row();

		$country_val = get_country($patient_demographic->country);
		$country_name = $country_val[0]->name;

		$state_val = get_state($patient_demographic->state);
		$state_name = $state_val[0]->name;

		$city_val = get_city($patient_demographic->city);
		$city_name = $city_val[0]->name;

		$a['patient_application_no'] = $patient_demographic->patient_application_no;
		$a['first_name'] = $patient_demographic->first_name;
		$a['middle_name'] = $patient_demographic->middle_name;
		$a['last_name'] = $patient_demographic->last_name;
		$a['dob'] = $patient_demographic->dob;
		$a['email'] = $patient_demographic->email;
		$a['address'] = $patient_demographic->address;
		$a['zone'] = $patient_demographic->zone;
		$a['zone_name'] = get_zone_by_id($patient_demographic->zone)->zone;
		$a['country'] = $patient_demographic->country;
		$a['country_name'] = $country_name;
		$a['state'] = $patient_demographic->state;
		$a['state_name'] = $state_name;
		$a['city'] =$patient_demographic->city;
		$a['city_name'] = $city_name;
		$a['pincode'] = $patient_demographic->pincode;;
		$a['mobile'] = $patient_demographic->mobile;

		echo json_encode(array("status"=>'success', "msg"=>'Update Successfully', "data"=>$a));
	}
	else
	{
		echo json_encode(array("status"=>'fail', "msg"=>'Update Fail'));
	}

}

function save_demographic_detail()
{
	$save['patient_id'] = $this->input->post('patient_id');
	$demographic_dob = $this->input->post('demographic_dob');
	$mydate=explode('-', $demographic_dob);
    $newdate=$mydate[2].'-'.$mydate[0].'-'.$mydate[1];
	$save['demographic_dob']=$newdate;
	$save['demographic_gender'] = $this->input->post('demographic_gender');
	$save['demographic_language'] = $this->input->post('demographic_language');

 if(!empty($_FILES['demographic_picture']['name']))
	{ 
		$file_name_demographic_picture = $_FILES["demographic_picture"]["name"];
		if(@is_uploaded_file($_FILES["demographic_picture"]["tmp_name"]))
		 {
		   move_uploaded_file($_FILES['demographic_picture']['tmp_name'],"./assets/patient/".$file_name_demographic_picture);
	     }	

		$save['demographic_image']  = $file_name_demographic_picture;
   }

$update_basic = $this->patient_model->update_patient_demographic($save,'patient_demographic');


	if($update_basic == '1')
	 {
	 	echo json_encode(array("status"=>'success', "msg"=>'Saved Successfully'));
	 }
	 else
	 {
	 	echo json_encode(array("status"=>'fail', "msg"=>'Saved Failed'));	
	 }



	//$demographic_dob = $this->input->post('demographic_dob');
}


function get_demographic_detail()
{
	$b = array();

	$patient_id = $this->input->post('patient_id');
    $this->db->where('patient_id',$patient_id);
	$patient_demographic = $this->db->get('patient_demographic')->row();

	if(!empty($patient_demographic))
	{
		$a['id'] = $patient_demographic->id;
		$a['demographic_dob'] = $patient_demographic->demographic_dob;

		if($patient_demographic->demographic_image != '')
		{
		  $a['demographic_image'] = base_url().'assets/patient/'.$patient_demographic->demographic_image;
		}
		else
		{	
			$a['demographic_image'] = '';
		}	

		$a['demographic_gender'] = $patient_demographic->demographic_gender;
		$a['demographic_language'] = $patient_demographic->demographic_language;
		
	//	array_push($b,$a);

		echo json_encode(array("status"=>'success', "data"=>$a));
	}
	else
	{
		$a['demographic_dob'] = '';
		$a['demographic_gender'] = '';
		$a['demographic_language'] = '';
		echo json_encode(array("status"=>'fail', "data"=>$a));
	}

}



function edit_demographic_information()
{	
	$save['patient_id'] = $this->input->post('patient_id');
	//$save['id'] = $this->input->post('id');
	$demographic_dob = $this->input->post('demographic_dob');
	$mydate=explode('-', $demographic_dob);
    $newdate=$mydate[2].'-'.$mydate[0].'-'.$mydate[1];
	$save['demographic_dob']=$newdate;
	$save['demographic_gender'] = $this->input->post('demographic_gender');
	$save['demographic_language'] = $this->input->post('demographic_language');


	// if(!empty($_FILES['demographic_picture']['name']))
	// { 
	// 	$file_name_demographic_picture = $_FILES["demographic_picture"]["name"];
	// 	if(@is_uploaded_file($_FILES["demographic_picture"]["tmp_name"]))
	// 	 {
	// 	   move_uploaded_file($_FILES['demographic_picture']['tmp_name'],"./assets/patient/".$file_name_demographic_picture);
	//      }	

	// 	$save['demographic_image']  = $file_name_demographic_picture;
 //   }


if(!empty($this->input->post("demographic_picture")))
{
	$image = base64_decode($this->input->post("demographic_picture"));
	$image_name = md5(uniqid(rand(), true));
	$filename = $image_name . '.' . 'png';

	$path = "./assets/patient/".$filename;

	//image uploading folder path
	file_put_contents($path, $image);

	$save['demographic_image'] =  $filename;
}

else
{
	$save['demographic_image'] = '';
}


	//$update_basic = $this->patient_model->update_demographic_details_edit($save['id'],$save['patient_id'],$save,'patient_demographic');
   $update_basic = $this->patient_model->update_patient_new_demographic_edit($save['patient_id'],$save,'patient_demographic');

	if($update_basic == '1')
	{
		$this->db->where('patient_id',$save['patient_id']);
		$patient_demographic = $this->db->get('patient_demographic')->row();

		$a['patient_id'] = $save['patient_id'];
		$a['demographic_dob'] = $save['demographic_dob'];
		$a['demographic_image'] = base_url().'assets/patient/'.$patient_demographic->demographic_image;
		$a['demographic_gender'] = $patient_demographic->demographic_gender;
		$a['demographic_language'] = $patient_demographic->demographic_language;

		echo json_encode(array("status"=>'success', "msg"=>'Update Successfully', "data"=>$a));
	}
	else
	{
		echo json_encode(array("status"=>'fail', "msg"=>'Update Fail'));
	}

}


function get_patient_dependent()
{
	$b = array();
	$patient_id =  $this->input->post('patient_id');

	$this->db->where('patient_id',$patient_id);
	$patient_dependent = $this->db->get('patient_dependent')->result();

	if(!empty($patient_dependent))	
	{
		foreach ($patient_dependent as $row)
		 {
			$a['patient_id'] = $row->patient_id;
			$a['id'] = $row->id;
			$a['dependent_first_name'] = $row->dependent_first_name;
			$a['dependent_middle_name'] = $row->dependent_middle_name;
			$a['dependent_last_name'] = $row->dependent_last_name;
			$a['dependent_dob'] = $row->dependent_dob;
			$a['dependent_relationship'] = $row->dependent_relationship;
			$a['patient_phone'] = $row->patient_phone;
			array_push($b,$a);
		 }

		 echo json_encode(array("status"=>'success', "data"=>$b));
	}

	else
	{
		echo json_encode(array("status"=>'success', "data"=>$b));
	}

}

function save_dependent()
{
	$save['patient_id'] = $this->input->post('patient_id');
	$save['dependent_first_name'] = $this->input->post('dependent_first_name');
	$save['dependent_middle_name'] = $this->input->post('dependent_middle_name');
	$save['dependent_last_name'] = $this->input->post('dependent_last_name');

    $save['gender'] = $this->input->post('dependent_gender');
	$mydate=$this->input->post('dependent_dob');
	if(!empty($mydate))
	{
		$mydate=explode('-', $mydate);
    	$newdate=$mydate[2].'-'.$mydate[0].'-'.$mydate[1];	
	}
	else
	{
		$newdate = "";
	}

    $save['dependent_dob']=$newdate;

    $save['dependent_relationship'] = $this->input->post('dependent1_relationship');
    $save['patient_phone'] = $this->input->post('patient_phone');

    if(!empty($save['patient_id']) && !empty($save['dependent_first_name']) && !empty($this->input->post('dependent_dob')) && !empty($save['dependent_relationship']))
    {


	$update_basic = $this->patient_model->update_patient_demographic($save,'patient_dependent');

	$last_id = $this->db->insert_id();

	if($update_basic == '1')
	 {
	 	$this->db->where('id',$last_id);
		$patient_dependent_row = $this->db->get('patient_dependent')->row();

		 if(is_null($patient_dependent_row->patient_application_no))
		 {
		 	$patient_application_no	= '';
		 }
		 else
		 {
		 	$patient_application_no = $patient_dependent_row->patient_application_no;
		 }

		  if(is_null($patient_dependent_row->dependent_first_name))
		 {
		 	$dependent_first_name	= '';
		 }
		 else
		 {
		 	$dependent_first_name = $patient_dependent_row->dependent_first_name;
		 }

		 if(is_null($patient_dependent_row->dependent_middle_name))
		 {
		 	$dependent_middle_name	= '';
		 }
		 else
		 {
		 	$dependent_middle_name = $patient_dependent_row->dependent_middle_name;
		 }

		 if(is_null($patient_dependent_row->dependent_last_name))
		 {
		 	$dependent_last_name	= '';
		 }
		 else
		 {
		 	$dependent_last_name = $patient_dependent_row->dependent_last_name;
		 }

		 if(is_null($patient_dependent_row->dependent_dob))
		 {
		 	$dependent_dob	= '';
		 }
		 else
		 {
		 	$dependent_dob = $patient_dependent_row->dependent_dob;
		 }

		 if(is_null($patient_dependent_row->dependent_relationship))
		 {
		 	$dependent_relationship	= '';
		 }
		 else
		 {
		 	$dependent_relationship = $patient_dependent_row->dependent_relationship;
		 }

		  if(is_null($patient_dependent_row->gender))
		 {
		 	$gender	= '';
		 }
		 else
		 {
		 	$gender = $patient_dependent_row->gender;
		 }


		$patient_dependent = array(
			"id"=>$patient_dependent_row->id,
			"patient_application_no"=>$patient_application_no,
			"patient_id"=>$patient_dependent_row->id,
			"dependent_first_name"=>$dependent_first_name,
			"dependent_middle_name"=>$dependent_middle_name,
			"dependent_last_name"=>$dependent_last_name,
			"dependent_dob"=>$dependent_dob,
			"dependent_relationship"=>$dependent_relationship,
			"gender"=>$gender,
		);	

	 	echo json_encode(array("status"=>'success', "msg"=>'Saved Successfully',"data"=>$patient_dependent));
	 }
	 else
	 {
	 	echo json_encode(array("status"=>'fail', "msg"=>'Saved Failed'));	
	 }

	}
	else
	{
	  echo json_encode(array("status"=>'fail', "msg"=>'No data post'));	
	}
}



function edit_dependent()
{
	$save['patient_id'] = $this->input->post('patient_id');
	$id = $this->input->post('dependent_id');
	$save['dependent_first_name'] = $this->input->post('dependent_first_name');
	$save['dependent_middle_name'] = $this->input->post('dependent_middle_name');
	$save['dependent_last_name'] = $this->input->post('dependent_last_name');

	$mydate=$this->input->post('dependent_dob');
    $mydate=explode('-', $mydate);
    $newdate=$mydate[2].'-'.$mydate[0].'-'.$mydate[1];
    $save['dependent_dob']=$newdate;

    $save['dependent_relationship'] = $this->input->post('dependent1_relationship');
    $save['patient_phone'] = $this->input->post('patient_phone');
	// $save['patient_cell_phone'] = $this->input->post('patient_cell_phone');
	// $save['patient_home_phone'] = $this->input->post('patient_home_phone');
	// $save['patient_work_phone'] = $this->input->post('patient_work_phone');

$update_dependent = $this->patient_model->update_dependent_details_edit($id,$save['patient_id'],$save,'patient_dependent');

	if($update_dependent == '1')
	 {
		$this->db->where('id',$id);
		$patient_dependent = $this->db->get('patient_dependent')->row();

		$a['patient_id'] = $save['patient_id'];
		$a['dependent_first_name'] = $patient_dependent->dependent_first_name;
		$a['dependent_middle_name'] = $patient_dependent->dependent_middle_name;
		$a['dependent_last_name'] = $patient_dependent->dependent_last_name;
		$a['dependent_dob'] = $patient_dependent->dependent_dob;
		$a['dependent_relationship'] = $patient_dependent->dependent_relationship;
		$a['patient_phone'] = $patient_dependent->patient_phone;

	 	echo json_encode(array("status"=>'success', "data"=>$a));
	 }
	 else
	 {
		$a['patient_id'] = '';
		$a['dependent_first_name'] = '';
		$a['dependent_middle_name'] = '';
		$a['dependent_last_name'] = '';
		$a['dependent_dob'] = '';
		$a['dependent_relationship'] = '';
		$a['patient_phone'] = '';

	 	echo json_encode(array("status"=>'fail', "data"=>$a));	
	 }
}


function delete_dependent()
{
	$id = $this->input->post('dependent_id');
	$delete_dependent = delete_data($id,'patient_dependent');
	$delete_past_medical_history = delete_data_in_f_table($id, 'dependent_id','patient_past_medical_history');
	$delete_medication = delete_data_in_f_table($id, 'medication_for','patient_medication');
	$delete_allergy = delete_data_in_f_table($id, 'allergy_for','patient_allergies');


	if($delete_dependent == '1' )
	{
		echo json_encode(array("status"=>'success', "msg"=>'Delete Success'));
	}
	else
	{
		echo json_encode(array("status"=>'fail', "msg"=>'Delete Failed'));
	}
}



function save_pharmacy()
{
	$save['patient_id'] = $this->input->post('patient_id');
	$save['dependent_id'] = $this->input->post('dependent_id');
	$save['patient_pharmacy_zip'] = $this->input->post('zipcode');
	$save['pharmacy_id'] = $this->input->post('pharmacy_list');

	if(!empty($save['patient_pharmacy_zip']) && !empty($save['pharmacy_id']))
	{
		$update_basic = $this->patient_model->update_patient_demographic($save,'patient_pharmacy');
			if($update_basic == '1')
			{
				echo json_encode(array("status"=>'success', "msg"=>'Save Success'));
			}
			else
			{
				echo json_encode(array("status"=>'fail', "msg"=>'Save Failed'));
			}
	}
	else
	{
		echo json_encode(array("status"=>'fail', "msg"=>'Zip code and phamacy is empty'));
	}



	
}




function get_pharmacy()
{
	$patient_id = $this->input->post('patient_id');
	$dependent_id = $this->input->post('dependent_id');
	$b = array();

	if(!empty($dependent_id))
	{
		$this->db->order_by('id','DESC');
		$this->db->limit(1);
		$this->db->where('patient_id',$patient_id);
		$this->db->where('dependent_id',$dependent_id);
		$patient_pharmacy = $this->db->get('patient_pharmacy')->result();	
	}
	else
	{
		$this->db->where('patient_id',$patient_id);
		$patient_pharmacy = $this->db->get('patient_pharmacy')->result();
	}
	

	if(!empty($patient_pharmacy))	
	{
		foreach ($patient_pharmacy as $key)
		 {

		    $this->db->where('Pharmacy_NCPDP',$key->pharmacy_id);
			$patient_pharmacy_detail = $this->db->get('tblPharmacy')->row();

			if(!empty($patient_pharmacy_detail))
			{
					$a['id'] = $key->id;
					$a['patient_id'] = $key->patient_id;
					$a['pharmacy_id'] = $key->pharmacy_id;

					$a['Pharmacy_name'] = $patient_pharmacy_detail->Pharmacy_StoreName; 
					$a['Pharmacy_phone'] = $patient_pharmacy_detail->Pharmacy_Telephone1; 
					$a['Pharmacy_address'] = $patient_pharmacy_detail->Pharmacy_Address1; 
					$a['Pharmacy_state'] = $patient_pharmacy_detail->Pharmacy_StateAbbr; 
					$a['Pharmacy_zip'] = $patient_pharmacy_detail->Pharmacy_Zip; 
					$a['Pharmacy_fax'] = $patient_pharmacy_detail->Pharmacy_Fax; 

					array_push($b,$a);
			}
			else
			{
				echo json_encode(array("status"=>'success', "data"=>$b));
			}

		
			
		 }

		echo json_encode(array("status"=>'success', "data"=>$b));

	}	
	else
	{
		echo json_encode(array("status"=>'success',  "data"=>$b));	
	}


		
}


function delete_pharmacy()
{
	$id = $this->input->post('id');

	$a = delete_data($id,'patient_pharmacy');


	if($a == '1')
	{
		echo json_encode(array("status"=>'success', "msg"=>'Delete Success'));
	}
	else{
		echo json_encode(array("status"=>'fail',  "msg"=>"Delete Failed"));	
	}

}




function save_vital_history()
{
	$save['patient_id'] = $this->input->post('patient_id');
	//$save['dependent_id'] = $this->input->post('dependent_id');
	$save['medical_history_add'] = $this->input->post('medical_history_add');
	$save['medical_height'] = $this->input->post('medical_height_ft');
	$save['medical_height_in'] = $this->input->post('medical_height_in');
	$save['medical_weight'] = $this->input->post('medical_weight');
	$save['medical_bmi'] = $this->input->post('medical_bmi');

$update_basic = $this->patient_model->update_patient_demographic($save,'patient_medical_history');

	if($update_basic=='1')
	{
		echo json_encode(array("status"=>'success', "msg"=>'Save Success'));
	}
	else
	{
		echo json_encode(array("status"=>'failed', "msg"=>'Save failed'));
	}

}


function get_vital_history()
{
	 $patient_id = $this->input->post('patient_id');
	// $patient_id = $this->input->post('patient_id');


	 $this->db->where('patient_id',$patient_id);
	 $patient_pharmacy_vital = $this->db->get('patient_medical_history')->row();

	 if(!empty($patient_pharmacy_vital))
	 {
	 	$a['id'] = $patient_pharmacy_vital->id;
	 	$a['patient_id'] = $patient_pharmacy_vital->patient_id;
	 	$a['medical_history_add'] = $patient_pharmacy_vital->medical_history_add;
	 	$a['medical_weight'] = $patient_pharmacy_vital->medical_weight;
	 	$a['medical_height'] = $patient_pharmacy_vital->medical_height;
	 	$a['medical_height_inch'] = $patient_pharmacy_vital->medical_height_in;
	 	$a['medical_bmi'] = $patient_pharmacy_vital->medical_bmi;

	 	echo json_encode(array("status"=>'success', "data"=>$a));
	 }
	 else
	 {
	 	$a['id'] = '';
	 	$a['patient_id'] = '';
	 	$a['medical_history_add'] = '';
	 	$a['medical_weight'] = '';
	 	$a['medical_height'] = '';
	 	$a['medical_height_inch'] = '';
	 	$a['medical_bmi'] = '';

	 	echo json_encode(array("status"=>'success', "data"=>$a));
	 }

}



function edit_vital_history()
{
	$id = $this->input->post('id');
	$save['patient_id'] = $this->input->post('patient_id');
	$save['medical_history_add'] = $this->input->post('medical_history_add');
	$save['medical_height'] = $this->input->post('medical_height_ft');
	$save['medical_height_in'] = $this->input->post('medical_height_in');
	$save['medical_weight'] = $this->input->post('medical_weight');
	$save['medical_bmi'] = $this->input->post('medical_bmi');

$update_basic = $this->patient_model->update_demographic_details_edit($id,$save['patient_id'],$save,'patient_medical_history');
	if($update_basic=='1')
	{
		$this->db->where('id',$id);
		$patient_pharmacy_detail_edit = $this->db->get('patient_medical_history')->row();

		$a['id'] = $patient_pharmacy_detail_edit->id;
	 	$a['patient_id'] = $patient_pharmacy_detail_edit->patient_id;
	 	$a['medical_history_add'] = $patient_pharmacy_detail_edit->medical_history_add;
	 	$a['medical_weight'] = $patient_pharmacy_detail_edit->medical_weight;
	 	$a['medical_height'] = $patient_pharmacy_detail_edit->medical_height;
	 	$a['medical_height_inch'] = $patient_pharmacy_detail_edit->medical_height_in;
	 	$a['medical_bmi'] = $patient_pharmacy_detail_edit->medical_bmi;

		echo json_encode(array("status"=>'success', "msg"=>'Update Success', "data"=>$a));
	}
	else
	{
		echo json_encode(array("status"=>'failed', "msg"=>'Update failed'));
	}

}


function save_immunization()
{
	$save['patient_id'] = $this->input->post('patient_id');
	$save['imunization'] = $this->input->post('imunization');

	$update_basic = $this->patient_model->update_patient_demographic($save,'patient_imunization');

	if($update_basic=='1')
	{
		echo json_encode(array("status"=>'success', "msg"=>'Save Success'));
	}
	else
	{
		echo json_encode(array("status"=>'failed', "msg"=>'Save failed'));
	}

}


function get_immunization()
{
	$patient_id = $this->input->post('patient_id');

	$this->db->where('patient_id',$patient_id);
	$patient_immunization = $this->db->get('patient_imunization')->row();

	if(!empty($patient_immunization))
	{
		$a['id'] = $patient_immunization->id;
	 	$a['patient_id'] = $patient_immunization->patient_id;
	 	$a['imunization'] = $patient_immunization->imunization;	

	 	echo json_encode(array("status"=>'success', "data"=>$a));
	}
	else
	{
		$a['id'] = '';
	 	$a['patient_id'] = '';
	 	$a['imunization'] = '';

	 	echo json_encode(array("status"=>'success', "data"=>$a));
	}
}



function edit_immunization()
{
 	$save['patient_id'] = $this->input->post('patient_id');
 	$save['imunization'] = $this->input->post('imunization');
    $id=$this->input->post('id');

$update_basic = $this->patient_model->update_demographic_details_edit($id,$save['patient_id'],$save,'patient_imunization');
	if($update_basic=='1')
	{
		$this->db->where('id',$id);
		$patient_immunization = $this->db->get('patient_imunization')->row();

		$a['id'] = $patient_immunization->id;
	 	$a['patient_id'] = $patient_immunization->patient_id;
	 	$a['imunization'] = $patient_immunization->imunization;	

		echo json_encode(array("status"=>'success', "msg"=>'Update Success', "data"=>$a));
	}
	else
	{
		echo json_encode(array("status"=>'failed', "msg"=>'Update failed'));
	}

}


function get_all_allergy()
{
		$b = array();
		$all_allergy = $this->db->get('tbl_allergy')->result();

		foreach ($all_allergy as $value) 
		{
			$a['id'] = 	$value->id;
			$a['description'] = 	$value->description;
			array_push($b, $a);
		}

	echo json_encode(array("status"=>'success', "data"=>$b));
}


function list_of_severtity()
{
	$b = array();

	$a['id'] = 1;
	$a['severity'] = 'Mild';
	array_push($b, $a);
	$a['id'] = 2;
	$a['severity'] = 'Moderate';
	array_push($b, $a);
	$a['severity'] = 3;
	$a['severity'] = 'severe';
	array_push($b, $a);
	
echo json_encode(array("status"=>'success', "data"=>$b));
}


function list_of_reaction()
{
	$b = array();
	$all_reaction = $this->db->get('drug_allergy_dump', 31)->result();

	foreach ($all_reaction as  $value) 
	{
		$a['id'] = $value->id;
		$a['reaction_type'] = $value->reaction_type;
		array_push($b, $a);
	}

	echo json_encode(array("status"=>'success', "data"=>$b));

}



function save_allergy()
{
	$save['patient_id'] = $this->input->post('patient_id');
 	$save['allergy_for'] = $this->input->post('allergy_for');
 	$save['name'] = $this->input->post('name');
    $save['medical_allergies'] = $this->input->post('medical_allergies');
    $save['medical_severity'] = $this->input->post('medical_severity');
    $save['reaction_type'] =$this->input->post('reaction_type');
    $save['notes'] = $this->input->post('notes');
    $q =  $this->db->insert('patient_allergies',$save);

	if($q=='1')
	{
		echo json_encode(array("status"=>'success', "msg"=>'Save Success'));
	}
	else
	{
		echo json_encode(array("status"=>'failed', "msg"=>'Save failed'));
	}

}

function get_patient_allergy()
{
	$b= array();
	$patient_id = $this->input->post('patient_id');
	$dependent_id = $this->input->post('dependent_id');

	if(!empty($dependent_id))
	{
		$this->db->where('patient_id',$patient_id);
		$this->db->where('allergy_for',$dependent_id);
		$patient_allergy = $this->db->get('patient_allergies')->result();	
	}	
	else
	{
		$this->db->where('patient_id',$patient_id);
		$this->db->where('allergy_for','');
		$this->db->or_where('allergy_for',0);
		//$this->db->or_where('dependent_id',0);
		$patient_allergy = $this->db->get('patient_allergies')->result();
	}

 	

	if(!empty($patient_id))
	{
		if(!empty($patient_allergy))
		{
			foreach ($patient_allergy as $value) 
			{
				$a['id'] = $value->id;
			 	$a['patient_id'] = $value->patient_id;
			 	$a['allergy_for'] = $value->allergy_for;

			 if(!empty($value->medical_allergies))
			 {
			 	$allergy_name_all = get_data_from_where('tbl_allergy','id',$value->medical_allergies);	
			 	$allergy_name = $allergy_name_all->description;
			 }
			 else
			 {
			 	$allergy_name = '';
			 }	

			 if(!empty($value->medical_severity))
			 {
			 	$severity_name_all = get_data_from_where('drug_allergy_dump','id',$value->medical_severity);
				$severity_name = $severity_name_all->severity;
			 }
			 else
			 {
			 	$severity_name = '';
			 }

			if(!empty($value->reaction_type))
			{
				$reaction_type_all = get_data_from_where('drug_allergy_dump','id',$value->reaction_type);
			    $reaction_name = $reaction_type_all->reaction_type;	
			}
			else
			{
				 $reaction_name = '';
			}		

	
				$a['medical_allergies'] = $allergy_name;
				$a['severity_name'] = $severity_name;
				$a['name'] = $value->name;
				$a['reaction_type'] = $reaction_name;
				$a['notes'] = $value->notes;

				array_push($b,$a);
			}	

		 	echo json_encode(array("status"=>'success', "data"=>$b));
		}
		else
		{
		 	echo json_encode(array("status"=>'success', "data"=>$b));
		}
	 
	}

}



function get_patient_allergy_from_left()
{
	$b= array();
	$patient_id = $this->input->post('patient_id');
	//$dependent_id = $this->input->post('dependent_id');
		$this->db->order_by("id", "desc");
		$this->db->where('patient_id',$patient_id);
		$patient_allergy = $this->db->get('patient_allergies')->result();
	

 	

	if(!empty($patient_id))
	{
		if(!empty($patient_allergy))
		{
			foreach ($patient_allergy as $value) 
			{
				$a['id'] = $value->id;
			 	$a['patient_id'] = $value->patient_id;
			 //	$a['allergy_for'] = $value->allergy_for;


			 	if(!empty($value->allergy_for))
		  		{
		  			$a['allergy_for']	= $value->allergy_for;	
		  			$dependent_info = get_dependent_info_for_visit($value->allergy_for);

		  			if(!empty($dependent_info))
		  			{
		  				$a['name']	= $dependent_info[0]->dependent_first_name;
		  			}
		  			else
		  			{
		  				$a['name']	= '';
		  			}

		  			
		  		}
		  		else
		  		{
		  			$a['allergy_for']	='';
		  			$a['name']	= '';
		  		}


			 if(!empty($value->medical_allergies))
			 {
			 	$allergy_name_all = get_data_from_where('tbl_allergy','id',$value->medical_allergies);	
			 	$allergy_name = $allergy_name_all->description;
			 }
			 else
			 {
			 	$allergy_name = '';
			 }	

			 if(!empty($value->medical_severity))
			 {
			 	$severity_name_all = get_data_from_where('drug_allergy_dump','id',$value->medical_severity);
				$severity_name = $severity_name_all->severity;
			 }
			 else
			 {
			 	$severity_name = '';
			 }

			if(!empty($value->reaction_type))
			{
				$reaction_type_all = get_data_from_where('drug_allergy_dump','id',$value->reaction_type);
			    $reaction_name = $reaction_type_all->reaction_type;	
			}
			else
			{
				 $reaction_name = '';
			}		

	
				$a['medical_allergies'] = $allergy_name;
				$a['severity_name'] = $severity_name;
				//$a['name'] = $value->name;
				$a['reaction_type'] = $reaction_name;
				$a['notes'] = $value->notes;

				array_push($b,$a);
			}	

		 	echo json_encode(array("status"=>'success', "data"=>$b));
		}
		else
		{
		 	echo json_encode(array("status"=>'success', "data"=>$b));
		}
	 
	}

}




function edit_patient_allergy()
{
	$b = array();
	//$patient_id = $this->input->post('patient_id');

	$id = $this->input->post('id');
	$save['patient_id'] = $this->input->post('patient_id');
    $save['medical_allergies'] = $this->input->post('medical_allergies');
    $save['medical_severity'] = $this->input->post('medical_severity');
    $save['reaction_type'] =$this->input->post('reaction_type');
    $save['notes'] = $this->input->post('notes');


$update_basic = $this->patient_model->update_allergy_details_edit($id,$save['patient_id'],$save,'patient_allergies');
		
	if($update_basic == '1')
	  {
		$this->db->where('id',$id);
		$patient_allergy = $this->db->get('patient_allergies')->result();

		foreach ($patient_allergy as $value) 
		{
			$a['id'] = $value->id;
		 	$a['patient_id'] = $value->patient_id;
		 	$allergy_name_all = get_data_from_where('tbl_allergy','id',$value->medical_allergies);
			$allergy_name = $allergy_name_all->description;

		 	$a['medical_allergies'] = $allergy_name;

		 $severity_name_all = get_data_from_where('drug_allergy_dump','id',$value->medical_severity);
		 $severity_name = $severity_name_all->severity;

	 	$reaction_type_all = get_data_from_where('drug_allergy_dump','id',$value->reaction_type);
		$reaction_name = $reaction_type_all->severity;

		 	$a['medical_severity'] = $severity_name;
		 	$a['reaction_type'] = $reaction_name;
		 	$a['notes'] = $value->notes;	

		 	array_push($b,$a);

		}
		
		echo json_encode(array("status"=>'success', "data"=>$b));

	  }

	  else
	  {
		echo json_encode(array("status"=>'fail', "data"=>$b));
	  }


}



function delete_allergy()
{
	$id =$this->input->post('id');

	$a = delete_data($id,'patient_allergies');


	if($a == '1')
	{
		echo json_encode(array("status"=>'success', "msg"=>'Delete Success'));
	}
	else{
		echo json_encode(array("status"=>'fail',  "msg"=>"Delete Failed"));	
	}

}

function delete_immunization()
{
	$id =$this->input->post('id');

	$a = delete_data($id,'patient_imunization');


	if($a == '1')
	{
		echo json_encode(array("status"=>'success', "msg"=>'Delete Success'));
	}
	else{
		echo json_encode(array("status"=>'fail',  "msg"=>"Delete Failed"));	
	}

}

function delete_vital_history()
{
	$id =$this->input->post('id');

	$a = delete_data($id,'patient_medical_history');

	if($a == '1')
	{
		echo json_encode(array("status"=>'success', "msg"=>'Delete Success'));
	}
	else{
		echo json_encode(array("status"=>'fail',  "msg"=>"Delete Failed"));	
	}

}


function get_all_drug_name()
{
	$b= array();

	$search_keywords = $this->input->post('search_keywords');

	$my_list = get_all_ws_drugs_list_for_app_search($search_keywords);

	//print_r($my_list);die;


	if(!empty($my_list))
	{
		foreach ($my_list as $key)
		 {
		 	//if($key->DrugNameID != 0)
		 	if($key->DrugID != 0)
		 	{
			 //$a['drug_id']	= $key->DrugNameID;
		 	 $a['drug_id']	= $key->DrugID.'-'.$key->DrugNameID;
			 $a['DrugName']	= $key->DrugName;
			 array_push($b,$a);
		 	}

			
		 }	
	
		echo json_encode(array("status"=>'success', "data"=>$b));
	}
	else
	{
		echo json_encode(array("status"=>'success', "data"=>$b));
	}


}


function get_allergy_by_keywords()
{
 	$b= array();

	$search_keywords = $this->input->post('search_keywords');

	$my_list = get_all_allergy_by_keywords($search_keywords);

	//print_r($my_list);die;


	if(!empty($my_list))
	{
		foreach ($my_list as $key)
		 {
		 	$a['id'] = 	$key->id;
			$a['description'] = 	$key->description;
			array_push($b,$a);
		 }	
	
		echo json_encode(array("status"=>'success', "data"=>$b));
	}
	else
	{
		echo json_encode(array("status"=>'success', "data"=>$b));
	}
    
}


function get_drug_strength()
{
	$b= array();
	$drug_id = $this->input->post('drug_id');

	$exploded_id = explode("-",$drug_id);
	$new_drug_id = $exploded_id[1];

	$this->db->where('DrugNameID',$new_drug_id);
	$patient_drug_strenth = $this->db->get('viewWSDrug')->result();


//	echo $this->db->last_query();die;

	if(!empty($patient_drug_strenth))
	{
		foreach ($patient_drug_strenth as $key)
		 {
			$a['DrugID']	= $key->DrugID;
			$a['dosage']	= $key->dosage;
			array_push($b,$a);
		 }	
	
		echo json_encode(array("status"=>'success', "data"=>$b));
	}
	else
	{
		echo json_encode(array("status"=>'success', "data"=>$b));
	}
}



function save_medication()
{
   $hex_string = "0123456789ABCDEF";
    $hex_6_digit = "";
    for($i=0; $i<9; $i++) 
    {
       $hex_6_digit .= $hex_string{rand(0,strlen($hex_string)-1)};
    }

    $save['patient_id'] =$this->input->post('patient_id');
    $save['external_id'] =  $hex_6_digit;
  //  $save['doctor_id']=$this->input->post('doctor_id');
  //  $save['doctor_type'] = $this->input->post('doctor_type');
    $save['medication_for'] = $this->input->post('medication_for');
    $save['name'] = $this->input->post('name');
    $save['is_taking_medicine'] = 'Yes';
    //$save['medication_description'] = $this->input->post('medication_description');
    //$drugs_name = $this->input->post('drug_name');
   // $save['medication_form'] = $this->input->post('form');
  
	$m_id = $this->input->post('DrugID');
	$explode_m_id = explode("-",$m_id);
	$drug_id = $explode_m_id[0];

    //$save['drugs_name'] =  $this->input->post('DrugID');
    $save['drugs_name'] =  $drug_id ;
    $save['strength'] = $this->input->post('stength');
    $save['status'] = '1';
  
  $q =   $this->db->insert('patient_medication',$save);

  //$last_id = $q->insert_id();

  if($q == '1')
  {

 //  	$this->db->where('id',$id);
	// $patient_allergy = $this->db->get('patient_allergies')->result();

	echo json_encode(array("status"=>'success', "msg"=>'Saved Successfully'));
  }
  else
  {
  	echo json_encode(array("status"=>'fail', "msg"=>'Saved Fail'));	
  }

}





function get_patient_medication()
{
	  $b = array();
	  $patient_id =$this->input->post('patient_id');
	  $dependent_id =$this->input->post('dependent_id');

	  if(!empty($patient_id))
	  {
	  	if(!empty($dependent_id))
	  	{
	    	$this->db->where('medication_for',$dependent_id);
	    	$this->db->where('patient_id',$patient_id);
	 	    $patient_medication = $this->db->get('patient_medication')->result();
	  	}
	  	else
	  	{
			$this->db->where('patient_id',$patient_id);
			$this->db->where('medication_for','');
			$this->db->or_where('medication_for','0');
	 	    $patient_medication = $this->db->get('patient_medication')->result();
	  	}

		  
	  if(!empty($patient_medication))
	  {
	  	foreach ($patient_medication as $value) 
	  	{
	  		$a['id']	= $value->id;
	  		if(!empty($value->medication_for))
	  		{
	  			$a['medication_for']	= $value->medication_for;	
	  			$dependent_info = get_dependent_info_for_visit($value->medication_for);
	  			$a['name']	= $dependent_info[0]->dependent_first_name;
	  		}
	  		else
	  		{
	  			$a['medication_for']	='';
	  			$a['name']	= '';
	  		}
	  		


			$a['external_id']	= $value->external_id;
			$a['patient_id']	= $value->patient_id;
			
 			//$drug_name_all = get_data_from_where('viewWSDrug','DrugNameID',$value->drugs_name);
 			$drug_name_all = get_data_from_where('viewWSDrug','DrugID',$value->drugs_name);

 			if(!empty($drug_name_all))
 			{
 				$drug_name_all_by_id = $drug_name_all->DrugName;
				$drug_dosage = $value->strength;	
 			}
 			else
 			{
 				$drug_name_all_by_id = '';
				$drug_dosage = '';	
 			}
			$a['drugs_id']	= $value->drugs_name ;
			$a['drugs_name']	= $drug_name_all_by_id ;
			$a['strength']	= $drug_dosage;
			array_push($b,$a);	
	  	}


			echo json_encode(array("status"=>'success', "data"=>$b));

	  }
	  else
	  {
	  	echo json_encode(array("status"=>'success', "data"=>$b));
	  }

	 }
	 else{
	 	echo json_encode(array("status"=>'fail', "data"=>$b));
	 } 
}


function get_patient_medication_from_left()
{
	  $b = array();
	  $patient_id =$this->input->post('patient_id');
	 // $dependent_id =$this->input->post('dependent_id');

	  if(!empty($patient_id))
	  {
	     	$this->db->order_by("id", "desc");
			$this->db->where('patient_id',$patient_id);
	 	    $patient_medication = $this->db->get('patient_medication')->result();
	  

		  
	  if(!empty($patient_medication))
	  {
	  	foreach ($patient_medication as $value) 
	  	{
	  		$a['id']	= $value->id;
	  		if(!empty($value->medication_for))
	  		{
	  			$a['medication_for']	= $value->medication_for;	
	  			$dependent_info = get_dependent_info_for_visit($value->medication_for);

	  			if(!empty($dependent_info))
	  			{
	  				$a['name']	= $dependent_info[0]->dependent_first_name;	
	  			}
	  			else
	  			{
	  				$a['name']	= '';
	  			}
	  			
	  		}
	  		else
	  		{
	  			$a['medication_for']	='';
	  			$a['name']	= '';
	  		}
	  		


			$a['external_id']	= $value->external_id;
			$a['patient_id']	= $value->patient_id;
			
 			$drug_name_all = get_data_from_where('viewWSDrug','DrugNameID',$value->drugs_name);

 			if(!empty($drug_name_all))
 			{
 				$drug_name_all_by_id = $drug_name_all->DrugName;
				$drug_dosage = $value->strength;	
 			}
 			else
 			{
 				$drug_name_all_by_id = '';
				$drug_dosage = '';	
 			}

			$a['drugs_name']	= $drug_name_all_by_id ;
			$a['strength']	= $drug_dosage;
			array_push($b,$a);	
	  	}


			echo json_encode(array("status"=>'success', "data"=>$b));

	  }
	  else
	  {
	  	echo json_encode(array("status"=>'success', "data"=>$b));
	  }

	 }
	 else{
	 	echo json_encode(array("status"=>'fail', "data"=>$b));
	 } 
}

function edit_patient_medication()
{
	$id = $this->input->post('medication_id');
    $save['drugs_name'] =  $this->input->post('DrugID');
    $save['strength'] = $this->input->post('stength');
    $save['patient_id'] = $this->input->post('patient_id');

$update_basic = $this->patient_model->update_family_history_details_edit($id,$save['patient_id'],$save,'patient_medication');

	if($update_basic == '1')
			{
				$this->db->where('id',$id);
				$patient_medication = $this->db->get('patient_medication')->row();

		echo json_encode(array("status"=>'success', "msg"=>'Update Successfully', "data"=>$patient_medication));

			}
			else
			{
				echo json_encode(array("status"=>'success', "msg"=>'Update failed', "data"=>$patient_medication));
			}

}


function delete_medication()
{
	$id =$this->input->post('id');

	$a = delete_data($id,'patient_medication');

	if($a == '1')
	{
		echo json_encode(array("status"=>'success', "msg"=>'Delete Success'));
	}
	else{
		echo json_encode(array("status"=>'fail',  "msg"=>"Delete Failed"));	
	}
}


function get_insurance()
{
	$patient_id =$this->input->post('patient_id');
	if(!empty($patient_id))
	{

		$this->db->where('patient_id',$patient_id);
		$patient_insurance = $this->db->get('patient_insurance')->row();

		if(!empty($patient_insurance))
		{
			echo json_encode(array("status"=>'success', "data"=>$patient_insurance));
		}	
		else
		{
			echo json_encode(array("status"=>'success', "data"=>$patient_insurance));
		}
	}
	else
	{
		echo json_encode(array("status"=>'fail', "data"=>[]));
	}	


}

function save_insurance()
{
	$data['patient_id'] =$this->input->post('patient_id');
	$data['insurance_name'] =$this->input->post('insurance_name');
	$data['subscriber_name'] =$this->input->post('subscriber_name');
	$data['identification_no'] =$this->input->post('identification_no');
	$data['group_number'] =$this->input->post('group_number');
	$data['rxbin'] =$this->input->post('rxbin');
	$data['rxpcn'] =$this->input->post('rxpcn');
	$data['rxgrp'] =$this->input->post('rxgrp');
	$data['adddate'] =date('Y-m-d');


 	 $q =  $this->db->insert('patient_insurance',$data);

	if($q=='1')
	{
		echo json_encode(array("status"=>'success', "msg"=>'Save Success'));
	}
	else
	{
		echo json_encode(array("status"=>'failed', "msg"=>'Save failed'));
	}
}


function get_all_diagnosis_name()
{
	//$this->db->where('patient_id',$patient_id);
	$patient_diagnosis = 
		$this->db->select('*');
		$this->db->from('diagnosis_dump');
		$this->db->limit(1000);
		$query = $this->db->get();
		$rows = $query->result();



	if(!empty($patient_diagnosis))
	{
		echo json_encode(array("status"=>'success', "data"=>$rows));
	}
	else
	{
		echo json_encode(array("status"=>'success', "data"=>$rows));	
	}


}



 function save_diagnosis()
 {
	$data['patient_id'] =$this->input->post('patient_id');
	$data['diagnosis'] =$this->input->post('diagnosis');
	$data['notes'] =$this->input->post('notes');

	$q =  $this->db->insert('patient_diagnosis',$data);
	$last_id = $this->db->insert_id();

	if($q == '1')
	{
		$this->db->where('id',$last_id);
		$patient_diagnosis = $this->db->get('patient_diagnosis')->row();

		echo json_encode(array("status"=>'success', "msg"=>'Saved Successfully', "data"=>$patient_diagnosis));		
	}
	else
	{
		echo json_encode(array("status"=>'success', "msg"=>'Saved failed'));			
	}
}



function get_diagnosis()
{
		$patient_id = $this->input->post('patient_id');

	if(!empty($patient_id))
	{
		$this->db->where('patient_id',$patient_id);
		$patient_iagnosis = $this->db->get('patient_diagnosis')->result();

		if(!empty($patient_iagnosis))
		{
			echo json_encode(array("status"=>'success', "data"=>$patient_iagnosis));		
		}
		else
		{
			echo json_encode(array("status"=>'success', "data"=>$patient_iagnosis));
		}
	}
	else
	{
		echo json_encode(array("status"=>'fail', "data"=>[]));
	}	
}



function delete_diagnosis()
{
	$id =$this->input->post('id');
	$a = delete_data($id,'patient_diagnosis');

	if($a == '1')
	{
		echo json_encode(array("status"=>'success', "msg"=>'Delete Success'));
	}
	else
	{
		echo json_encode(array("status"=>'fail',  "msg"=>"Delete Failed"));	
	}
}


function get_diease_and_condition()
{
	$b = array();
	$patient_diease_and_condition = $this->db->get('disease_and_condition')->result();

	if(!$patient_diease_and_condition)
	{
		echo json_encode(array("status"=>'success', "data"=>$patient_diease_and_condition));	
	}
	else
	{
		echo json_encode(array("status"=>'success', "data"=>$patient_diease_and_condition));		
	}
} 


 function save_patient_past_medical_history()
 {
 	$data['patient_id']= $this->input->post('patient_id');
 	$data['dependent_id']= $this->input->post('dependent_id');
 	$data['name']= $this->input->post('name');
 	$data['member']= $this->input->post('member');
 	$data['illness']= $this->input->post('illness');
 	$data['onset_age']= $this->input->post('onset_age');
 	$data['comment']= $this->input->post('comment');

	$q =  $this->db->insert('patient_past_medical_history',$data);
	$last_id = $this->db->insert_id();

	if($q == '1')
	{
		$this->db->where('id',$last_id);
		$patient_past_medical_history = $this->db->get('patient_past_medical_history')->row();

		echo json_encode(array("status"=>'success', "msg"=>'Saved Successfully', "data"=>$patient_past_medical_history));		
	}
	else
	{
		echo json_encode(array("status"=>'success', "msg"=>'Saved failed'));			
	}
 }



function get_patient_past_medical_history()
{
	$patient_id = $this->input->post('patient_id');
	$dependent_id = $this->input->post('dependent_id');

	if(!empty($patient_id))
	{
		if(!empty($dependent_id))
		{
			$this->db->where('patient_id',$patient_id);
			$this->db->where('dependent_id',$dependent_id);
			$patient_past_medical_history = $this->db->get('patient_past_medical_history')->result();
		}
		else
		{
			$this->db->where('patient_id',$patient_id);
			$this->db->where('dependent_id','');
			$this->db->or_where('dependent_id',0);
			$patient_past_medical_history = $this->db->get('patient_past_medical_history')->result();
		}

		

		if(!empty($patient_past_medical_history))
		{
			echo json_encode(array("status"=>'success', "data"=>$patient_past_medical_history));		
		}
		else
		{
			echo json_encode(array("status"=>'success', "data"=>$patient_past_medical_history));
		}
	}
	else
	{
		echo json_encode(array("status"=>'fail', "data"=>[]));
	}	
}


function get_patient_past_medical_history_from_left()
{
	$patient_id = $this->input->post('patient_id');
	$b = array();

	if(!empty($patient_id))
	{
	$this->db->order_by("id", "desc");
 	 $this->db->where('patient_id',$patient_id);
     $patient_past_medical_history = $this->db->get('patient_past_medical_history')->result();

		if(!empty($patient_past_medical_history))
		{
			foreach ($patient_past_medical_history as $value) 
			  	{
			  		$a['id']	= $value->id;
			  		if(!empty($value->dependent_id))
			  		{
			  			$a['dependent_id']	= $value->dependent_id;	
			  			$dependent_info = get_dependent_info_for_visit($value->dependent_id);

			  			if(!empty($dependent_info))
			  			{
			  				$a['name']	= $dependent_info[0]->dependent_first_name;	
			  			}
			  			else
			  			{
			  				$a['name']	= '';
			  			}

			  			
			  		}
			  		else
			  		{
			  			$a['dependent_id']	='';
			  			$a['name']	= '';
			  		}
			  
					$a['illness']	= $value->illness;
					$a['patient_id']	= $value->patient_id;
					
		 			

					$a['onset_age']	= $value->onset_age;
					$a['comment']	= $value->comment;
					array_push($b,$a);	
			  	}



			echo json_encode(array("status"=>'success', "data"=>$b));		
		}
		else
		{
			echo json_encode(array("status"=>'success', "data"=>$b));
		}
	}
	else
	{
		echo json_encode(array("status"=>'fail', "data"=>[]));
	}	
}



function get_past_medical_for_edit()
{
	$b = array();
	$id = $this->input->post('id');
	$this->db->where('id',$id);
    $patient_past_medical_history = $this->db->get('patient_past_medical_history')->row();	

    if(!empty($patient_past_medical_history))
    {
    	$a['id'] = $patient_past_medical_history->id;
    	$a['patient_id'] = $patient_past_medical_history->patient_id;
    	$a['dependent_id'] = $patient_past_medical_history->dependent_id;


    	$a['illness'] = $patient_past_medical_history->illness;
		$a['onset_age'] = $patient_past_medical_history->onset_age;
		$a['comment'] = $patient_past_medical_history->comment;

		array_push($b,$a);
		echo json_encode(array("status"=>'success', "data"=>$b));	
    }
    else
    {
    	echo json_encode(array("status"=>'success', "data"=>$b));
    }

  	

}




function get_medication_edit()
{
	$b = array();
	$id = $this->input->post('id');
	$this->db->where('id',$id);
    $value = $this->db->get('patient_medication')->row();	

    if(!empty($value))
    {
    		$a['id']	= $value->id;
	  		if(!empty($value->medication_for))
	  		{
	  			$a['medication_for']	= $value->medication_for;	
	  			$dependent_info = get_dependent_info_for_visit($value->medication_for);
	  			$a['name']	= $dependent_info[0]->dependent_first_name;
	  		}
	  		else
	  		{
	  			$a['medication_for']	='';
	  			$a['name']	= '';
	  		}

			$a['external_id']	= $value->external_id;
			$a['patient_id']	= $value->patient_id;
			
 			$drug_name_all = get_data_from_where('viewWSDrug','DrugNameID',$value->drugs_name);

 			if(!empty($drug_name_all))
 			{
 				$drug_name_all_by_id = $drug_name_all->DrugName;
				$drug_dosage = $value->strength;	
 			}
 			else
 			{
 				$drug_name_all_by_id = '';
				$drug_dosage = '';	
 			}
			$a['drugs_id']	= $value->drugs_name ;
			$a['drugs_name']	= $drug_name_all_by_id ;
			$a['strength']	= $drug_dosage;
			array_push($b,$a);	
		echo json_encode(array("status"=>'success', "data"=>$b));	
    }
    else
    {
    	echo json_encode(array("status"=>'success', "data"=>$b));
    }
}




function get_allergy_edit()
{
	$b = array();
	$id = $this->input->post('id');
	$this->db->where('id',$id);
    $value = $this->db->get('patient_allergies')->row();

   if(!empty($value))
		{
			// foreach ($patient_allergy as $value) 
			// {
				$a['id'] = $value->id;
			 	$a['patient_id'] = $value->patient_id;
			 	$a['allergy_for'] = $value->allergy_for;

			 if(!empty($value->medical_allergies))
			 {
			 	$allergy_name_all = get_data_from_where('tbl_allergy','id',$value->medical_allergies);	
			 	$allergy_name = $allergy_name_all->description;
			 }
			 else
			 {
			 	$allergy_name = '';
			 }	

			 if(!empty($value->medical_severity))
			 {
			 	$severity_name_all = get_data_from_where('drug_allergy_dump','id',$value->medical_severity);
				$severity_name = $severity_name_all->severity;
			 }
			 else
			 {
			 	$severity_name = '';
			 }

			if(!empty($value->reaction_type))
			{
				$reaction_type_all = get_data_from_where('drug_allergy_dump','id',$value->reaction_type);
			    $reaction_name = $reaction_type_all->reaction_type;	
			}
			else
			{
				 $reaction_name = '';
			}		

	
				$a['medical_allergies'] = $allergy_name;
				$a['severity_name'] = $severity_name;
				$a['name'] = $value->name;
				$a['reaction_type'] = $reaction_name;
				$a['notes'] = $value->notes;

				array_push($b,$a);
			//}	

		 	echo json_encode(array("status"=>'success', "data"=>$b));
		}
		else
		{
		 	echo json_encode(array("status"=>'success', "data"=>$b));
		}
    	



}



function edit_patient_past_medical_history()
{
	
  	 	$save['patient_id'] = $this->input->post('patient_id');
  	 	$id = $this->input->post('id');

	 	$save['member'] =  $this->input->post('member');
		$save['illness'] = $this->input->post('illness');

		$save['onset_age'] = $this->input->post('age');
		$save['comment'] = $this->input->post('comment');


 	$update_basic = $this->patient_model->update_family_history_details_edit($id,$save['patient_id'],$save,'patient_past_medical_history');

		if($update_basic == '1')
			{
				$this->db->where('id',$id);
				$patient_past_medical_history = $this->db->get('patient_past_medical_history')->row();

		echo json_encode(array("status"=>'success', "msg"=>'Update Successfully', "data"=>$patient_past_medical_history));
			}
			else
			{
				echo json_encode(array("status"=>'success', "msg"=>'Update failed', "data"=>$patient_past_medical_history));
			}
}




function delete_patient_past_medical_history()
{
	$id =$this->input->post('id');
	$a = delete_data($id,'patient_past_medical_history');

	if($a == '1')
	{
		echo json_encode(array("status"=>'success', "msg"=>'Delete Success'));
	}
	else
	{
		echo json_encode(array("status"=>'fail',  "msg"=>"Delete Failed"));	
	}
}




function patient_social_history_save()
{
		$save['patient_id'] = $this->input->post('patient_id');

	 	$save['use_tobacco'] = $this->input->post('tobbaco');
		$save['tobacco_notes'] = $this->input->post('tobacco_notes');

		$save['use_alcohal'] = $this->input->post('alcohal');
		$save['alcohal_notes'] = $this->input->post('alcohal_notes');

		$save['use_recreational_drugs'] = $this->input->post('drugs');
		$save['drugs_notes'] = $this->input->post('drugs_notes');

        $save['travel_out_of_country'] = $this->input->post('country');
		$save['out_country_notes'] = $this->input->post('travel_notes');

		//	$update_basic = $this->patient_model->update_patient_social_history($save,'patient_social_history');

		$update_basic = $this->db->insert('patient_social_history',$save);

		$last_id = 	$this->db->insert_id();

		$this->db->where('id',$last_id);
		$patient_social_history = $this->db->get('patient_social_history')->row();

			if($update_basic == '1')
			{

			echo json_encode(array("status"=>'success', "msg"=>'Save Successfully', "data"=>$patient_social_history)) ;
			}
			else
			{
				echo json_encode(array("status"=>'success', "msg"=>'Save Failed', "data"=>$patient_social_history));
			}
}



function get_patient_social_history()
{
	$patient_id = $this->input->post('patient_id');

	if(!empty($patient_id))
	{
		$this->db->where('patient_id',$patient_id);
		$patient_social_history = $this->db->get('patient_social_history')->result();

		if(!empty($patient_social_history))
		{
			echo json_encode(array("status"=>'success', "data"=>$patient_social_history));		
		}
		else
		{
			echo json_encode(array("status"=>'success', "data"=>$patient_social_history));
		}
	}
	else
	{
		echo json_encode(array("status"=>'fail', "data"=>[]));
	}	
}



function patient_social_history_edit()
{
		$id = $this->input->post('id');
		$save['patient_id'] = $this->input->post('patient_id');

	 	$save['use_tobacco'] = $this->input->post('tobbaco');
		$save['tobacco_notes'] = $this->input->post('tobacco_notes');

		$save['use_alcohal'] = $this->input->post('alcohal');
		$save['alcohal_notes'] = $this->input->post('alcohal_notes');

		$save['use_recreational_drugs'] = $this->input->post('drugs');
		$save['drugs_notes'] = $this->input->post('drugs_notes');

        $save['travel_out_of_country'] = $this->input->post('country');
		$save['out_country_notes'] = $this->input->post('travel_notes');

		//	$update_basic = $this->patient_model->update_patient_social_history($save,'patient_social_history');

$update_basic = $this->patient_model->update_social_history_details_edit($id,$save['patient_id'],$save,'patient_social_history');

		//$last_id = 	$this->db->insert_id();

		$this->db->where('id',$id);
		$patient_social_history = $this->db->get('patient_social_history')->row();

			if($update_basic == '1')
			{
			echo json_encode(array("status"=>'success', "msg"=>'Save Successfully', "data"=>$patient_social_history)) ;
			}
			else
			{
				echo json_encode(array("status"=>'success', "msg"=>'Save Failed', "data"=>$patient_social_history));
			}

}


function delete_patient_social_history()
{
	$id =$this->input->post('id');
	$a = delete_data($id,'patient_social_history');

	if($a == '1')
	{
		echo json_encode(array("status"=>'success', "msg"=>'Delete Success'));
	}
	else
	{
		echo json_encode(array("status"=>'fail',  "msg"=>"Delete Failed"));	
	}
}


function save_patient_family_history()
{
 	$data['patient_id']= $this->input->post('patient_id');
 	$data['member']= $this->input->post('member');
 	$data['illness']= $this->input->post('illness');
 	$data['onset_age']= $this->input->post('onset_age');
 

	$q =  $this->db->insert('patient_family_history',$data);
	$last_id = $this->db->insert_id();

	if($q == '1')
	{
		$this->db->where('id',$last_id);
		$patient_family_history = $this->db->get('patient_family_history')->row();

		echo json_encode(array("status"=>'success', "msg"=>'Saved Successfully', "data"=>$patient_family_history));		
	}
	else
	{
		echo json_encode(array("status"=>'success', "msg"=>'Saved failed'));			
	}

}



function get_patient_family_history()
{
	$patient_id = $this->input->post('patient_id');

	if(!empty($patient_id))
	{
		$this->db->where('patient_id',$patient_id);
		$patient_family_history = $this->db->get('patient_family_history')->result();

		if(!empty($patient_family_history))
		{
			echo json_encode(array("status"=>'success', "data"=>$patient_family_history));		
		}
		else
		{
			echo json_encode(array("status"=>'success', "data"=>$patient_family_history));
		}
	}
	else
	{
		echo json_encode(array("status"=>'fail', "data"=>[]));
	}	

}


function patient_family_history_edit()
{
		$id = $this->input->post('id');
		$save['patient_id'] = $this->input->post('patient_id');

	 	$save['member'] = $this->input->post('member');
		$save['illness'] =$this->input->post('illness');

		$save['onset_age'] = $this->input->post('age');

		//	$update_basic = $this->patient_model->update_patient_social_history($save,'patient_social_history');

$update_basic = $this->patient_model->update_family_history_details_edit($id,$save['patient_id'],$save,'patient_family_history');

		//$last_id = 	$this->db->insert_id();

		$this->db->where('id',$id);
		$patient_family_history = $this->db->get('patient_family_history')->row();

			if($update_basic == '1')
			{
			echo json_encode(array("status"=>'success', "msg"=>'Save Successfully', "data"=>$patient_family_history)) ;
			}
			else
			{
				echo json_encode(array("status"=>'success', "msg"=>'Save Failed', "data"=>$patient_family_history));
			}

}


function delete_patient_family_history()
{
	$id =$this->input->post('id');
	$a = delete_data($id,'patient_family_history');

	if($a == '1')
	{
		echo json_encode(array("status"=>'success', "msg"=>'Delete Success'));
	}
	else
	{
		echo json_encode(array("status"=>'fail',  "msg"=>"Delete Failed"));	
	}
}

function patient_save_obgyn_history()
{
    $save['patient_id'] = $this->input->post('patient_id');
    
    $dependent_id = $this->input->post('dependent_id');
    $dependent_info = get_dependent_info_for_visit($dependent_id);

	  if(!empty($this->input->post('dependent_id'))) 
	  {
	  	$save['dependent_id'] = $this->input->post('dependent_id');
	    $save['dependent_name'] = $dependent_info[0]->dependent_first_name;
	  } 
	  else
	  {
	  	$save['dependent_id'] = '';
	    $save['dependent_name'] = '';
	  }
    
    $mydate = $this->input->post('last_period');
    $save['pregnacy_change'] =$this->input->post('pregnancy_change');
    $save['birth_control_medication'] =$this->input->post('birth_control_medication');
    $save['medication_confirm'] =$this->input->post('birth_control_confirm');
    $save['birth_control_medication']=$this->input->post('birth_control');
    $save['other']=$this->input->post('other');
                         	           
	$mydate=explode('-', $mydate);
	$newdate=$mydate[2].'-'.$mydate[0].'-'.$mydate[1];

	$save['last_period_date']=$newdate;
 

	$q =  $this->patient_model->update_patient_family_history($save,'patient_obgyn_history');
	$last_id = $this->db->insert_id();

	if($q == '1')
	{
		$this->db->where('id',$last_id);
		$patient_obgyn_history = $this->db->get('patient_obgyn_history')->row();

		echo json_encode(array("status"=>'success', "msg"=>'Saved Successfully', "data"=>$patient_obgyn_history));		
	}
	else
	{
		echo json_encode(array("status"=>'success', "msg"=>'Saved failed'));			
	}

}


function patient_get_obgyn_history()
{
	$patient_id = $this->input->post('patient_id');

	if(!empty($patient_id))
	{
		$this->db->where('patient_id',$patient_id);
		$patient_obgyn_history = $this->db->get('patient_obgyn_history')->result();

		if(!empty($patient_family_history))
		{
			echo json_encode(array("status"=>'success', "data"=>$patient_obgyn_history));		
		}
		else
		{
			echo json_encode(array("status"=>'success', "data"=>$patient_obgyn_history));
		}
	}
	else
	{
		echo json_encode(array("status"=>'fail', "data"=>[]));
	}
}




function patient_edit_obgyn_history()
{
    $save['patient_id'] = $this->input->post('patient_id');
    $id = $this->input->post('id');
    $mydate = $this->input->post('last_period');
    $save['pregnacy_change'] =$this->input->post('pregnancy_change');
    $save['birth_control_medication'] =$this->input->post('birth_control_medication');
    $save['medication_confirm'] =$this->input->post('birth_control_confirm');
    $save['birth_control_medication']=$this->input->post('birth_control');
    $save['other']=$this->input->post('other');
                         	           
	$mydate=explode('-', $mydate);
	$newdate=$mydate[2].'-'.$mydate[0].'-'.$mydate[1];

	$save['last_period_date']=$newdate;
 

	$update_basic = $this->patient_model->update_social_history_details_edit($id,$save['patient_id'],$save,'patient_obgyn_history');

	$last_id = $this->db->insert_id();

	if($update_basic == '1')
	{
		$this->db->where('id',$last_id);
		$patient_obgyn_history = $this->db->get('patient_obgyn_history')->row();

		echo json_encode(array("status"=>'success', "msg"=>'Saved Successfully', "data"=>$patient_obgyn_history));		
	}
	else
	{
		echo json_encode(array("status"=>'success', "msg"=>'Saved failed'));			
	}

}


function delete_patient_obgyn_history()
{
	$id =$this->input->post('id');
	$a = delete_data($id,'patient_obgyn_history');

	if($a == '1')
	{
		echo json_encode(array("status"=>'success', "msg"=>'Delete Success'));
	}
	else
	{
		echo json_encode(array("status"=>'fail',  "msg"=>"Delete Failed"));	
	}
}

function patient_past_surgery_history_save()
{
 
  		$save['patient_id'] = $this->input->post('patient_id');
	 	$save['surgery_confirm'] = $this->input->post('surgery_name');
		$save['surgery_name'] = $this->input->post('surgery');
		$save['other'] = $this->input->post('other');
		$mydate=$this->input->post('surgery_date');
        $mydate=explode('-', $mydate);
        $newdate=$mydate[2].'-'.$mydate[0].'-'.$mydate[1];
        $save['surgery_date']=$newdate;
 

$update_basic = $this->patient_model->update_patient_social_history($save,'patient_past_surgery_history');

	$last_id = $this->db->insert_id();

	if($update_basic == '1')
	{
		$this->db->where('id',$last_id);
		$patient_past_surgery_history = $this->db->get('patient_past_surgery_history')->row();

		echo json_encode(array("status"=>'success', "msg"=>'Saved Successfully', "data"=>$patient_past_surgery_history));		
	}
	else
	{
		echo json_encode(array("status"=>'success', "msg"=>'Saved failed'));			
	}

}



function get_patient_past_surgery_history()
{
	$patient_id = $this->input->post('patient_id');

	if(!empty($patient_id))
	{
		$this->db->where('patient_id',$patient_id);
		$patient_past_surgery_history = $this->db->get('patient_past_surgery_history')->result();

		if(!empty($patient_past_surgery_history))
		{
			echo json_encode(array("status"=>'success', "data"=>$patient_past_surgery_history));		
		}
		else
		{
			echo json_encode(array("status"=>'success', "data"=>$patient_past_surgery_history));
		}
	}
	else
	{
		echo json_encode(array("status"=>'fail', "data"=>[]));
	}
}


function patient_past_surgery_history_edit()
{
   		$save['patient_id'] = $this->input->post('patient_id');
  	 	$id = $this->input->post('id');

	    $save['surgery_confirm'] = $this->input->post('surgery_name');
		//$save['surgery_date'] = $this->input->post('surgery_date');

		$save['surgery_name'] = $this->input->post('surgery');
		$save['ohter'] = $this->input->post('other');
			
		$mydate=$this->input->post('surgery_date');
         $mydate=explode('-', $mydate);
        $newdate=$mydate[2].'-'.$mydate[0].'-'.$mydate[1];
         $save['surgery_date']=$newdate;

		$save['surgery_name'] = $this->input->post('surgery');

$update_basic = $this->patient_model->update_social_history_details_edit($id,$save['patient_id'],$save,'patient_past_surgery_history');

	//$last_id = $this->db->insert_id();

	if($update_basic == '1')
	{
		$this->db->where('id',$$id);
		$patient_past_surgery_history = $this->db->get('patient_past_surgery_history')->row();

		echo json_encode(array("status"=>'success', "msg"=>'Saved Successfully', "data"=>$patient_past_surgery_history));		
	}
	else
	{
		echo json_encode(array("status"=>'success', "msg"=>'Saved failed'));			
	}

}

function delete_patient_past_surgery_history()
{
	$id =$this->input->post('id');
	$a = delete_data($id,'patient_past_surgery_history');

	if($a == '1')
	{
		echo json_encode(array("status"=>'success', "msg"=>'Delete Success'));
	}
	else
	{
		echo json_encode(array("status"=>'fail',  "msg"=>"Delete Failed"));	
	}
}



function patient_primary_docotr_save()
{
 		$save['patient_id'] = $this->input->post('patient_id');

	 	$save['primary_doctor_name'] = $this->input->post('primary_doctor_name');
		$save['primary_doctor_address'] = $this->input->post('primary_doctor_address');
		$save['primary_doctor_phone'] = $this->input->post('primary_doctor_phone');
		$save['fax'] = $this->input->post('primary_doctor_fax');
		$save['primary_demographic_language'] = $this->input->post('primary_demographic_language');
		$save['primary_doctor_state'] = $this->input->post('primary_doctor_state');
		$save['primary_doctor_city'] = $this->input->post('city_id');
		$save['primary_doctor_zipcode'] = $this->input->post('primary_doctor_zipcode');

	$update_basic = $this->patient_model->update_patient_demographic($save,'patient_primary');

	//$last_id = $this->db->insert_id();

	if($update_basic == '1')
	{
		// $this->db->where('id',$last_id);
		// $patient_past_surgery_history = $this->db->get('patient_past_surgery_history')->row();

		echo json_encode(array("status"=>'success', "msg"=>'Saved Successfully'));		
	}
	else
	{
		echo json_encode(array("status"=>'success', "msg"=>'Saved failed'));			
	}

}



function get_patient_primary_docotr()
{
	$patient_id = $this->input->post('patient_id');

	if(!empty($patient_id))
	{
		$this->db->where('patient_id',$patient_id);
		$patient_primary = $this->db->get('patient_primary')->result();

		if(!empty($patient_primary))
		{
			echo json_encode(array("status"=>'success', "data"=>$patient_primary));		
		}
		else
		{
			echo json_encode(array("status"=>'success', "data"=>$patient_primary));
		}
	}
	else
	{
		echo json_encode(array("status"=>'fail', "data"=>[]));
	}
}



  function update_patient_primary_edit()
     {
     	if($this->input->server('REQUEST_METHOD') === 'POST')
      	 {
      	 	$save['patient_id'] = $this->input->post('patient_id');
           
		 	$save['primary_doctor_name'] = $this->input->post('primary_doctor_name');
			$save['primary_doctor_address'] = $this->input->post('primary_doctor_address');
			$save['primary_doctor_phone'] = $this->input->post('primary_doctor_phone');
			$save['fax'] = $this->input->post('primary_doctor_fax');
			$save['primary_demographic_language'] = $this->input->post('primary_demographic_language');
			$save['primary_doctor_state'] = $this->input->post('primary_doctor_state');
			$save['primary_doctor_city'] = $this->input->post('city_id');
			$save['primary_doctor_zipcode'] = $this->input->post('primary_doctor_zipcode');
			$id=$this->input->post('id');

$update_basic = $this->patient_model->update_demographic_details_edit($id,$save['patient_id'],$save,'patient_primary');

	if($update_basic == '1')
			{
			    $this->db->where('id',$last_id);
		 		$patient_primary = $this->db->get('patient_primary')->row();

				echo json_encode(array("status"=>'success', "msg"=>'Saved Successfully', "data"=>$patient_primary));	
		    }
			else
			{
				echo json_encode(array("status"=>'fail', "msg"=>'Saved failed'));	
			}


		}

}

function delete_patient_primary()
{
	$id =$this->input->post('id');
	$a = delete_data($id,'patient_primary');

	if($a == '1')
	{
		echo json_encode(array("status"=>'success', "msg"=>'Delete Success'));
	}
	else
	{
		echo json_encode(array("status"=>'fail',  "msg"=>"Delete Failed"));	
	}
}


function save_patient_document()
{

 	  	  if($_FILES['lab_result']['name'] !='')
			{ 
				$file_name_uploadlab_result = $_FILES["lab_result"]["name"];

				if(@is_uploaded_file($_FILES["lab_result"]["tmp_name"]))
				 {
				   move_uploaded_file($_FILES['lab_result']['tmp_name'],"./assets/patient/lab_result/".$file_name_uploadlab_result);
			     }	

				$save_in_patient_health['lab_result_doc']  = $file_name_uploadlab_result;
		    }

			// Upload Lab Pic    

			   if($_FILES['lab_picture'] ['name'] !='')
				{ 
					$file_name_uploadlab_image = $_FILES["lab_picture"]["name"];
					if(@is_uploaded_file($_FILES["lab_picture"]["tmp_name"]))
					 {
					   move_uploaded_file($_FILES['lab_picture']['tmp_name'],"./assets/patient/lab_image/".$file_name_uploadlab_image);
				     }	

				$save_in_patient_health['lab_pic']  = $file_name_uploadlab_image;
			    }

			   // Upload Other Pic    

			   if($_FILES['lab_document']['name'] !='')
				{ 
					$file_name_uploadlab_doc = $_FILES["lab_document"]["name"];
					if(@is_uploaded_file($_FILES["lab_document"]["tmp_name"]))
					 {
					   move_uploaded_file($_FILES['lab_document']['tmp_name'],"./assets/patient/other_documents/".$file_name_uploadlab_doc);
				     }	

					$save_in_patient_health['other_doc']  = $file_name_uploadlab_doc;

					$save_in_patient_health['adddate']  = date("Y-m-d H:i:s");
			    }
  
                  $save_in_patient_health['patient_id']=$this->input->post('patient_id');
		
		$update_basic = $this->patient_model->update_patient_demographic($save_in_patient_health,'patient_document');


	if($update_basic == '1')
	{
		// $this->db->where('id',$last_id);
		// $patient_past_surgery_history = $this->db->get('patient_past_surgery_history')->row();

		echo json_encode(array("status"=>'success', "msg"=>'Saved Successfully'));		
	}
	else
	{
		echo json_encode(array("status"=>'success', "msg"=>'Saved failed'));			
	}


}


function patient_get_document()
{
	$patient_id = $this->input->post('patient_id');

	if(!empty($patient_id))
	{
		$this->db->where('patient_id',$patient_id);
		$patient_document = $this->db->get('patient_document')->result();

		if(!empty($patient_document))
		{
			echo json_encode(array("status"=>'success', "data"=>$patient_document));		
		}
		else
		{
			echo json_encode(array("status"=>'success', "data"=>$patient_document));
		}
	}
	else
	{
		echo json_encode(array("status"=>'fail', "data"=>[]));
	}
}



function update_patient_documents_edit()
 {
 	if($this->input->server('REQUEST_METHOD') === 'POST')
  	 {
  	 	// upload Lab Result 

  	 	$id=$this->input->post('id');	

  	 	$save['patient_id'] = $this->input->post('patient_id');

 	  	  if($_FILES['lab_result']['name'] !='')
			{ 
				$file_name_uploadlab_result = $_FILES["lab_result"]["name"];

				if(@is_uploaded_file($_FILES["lab_result"]["tmp_name"]))
				 {
				   move_uploaded_file($_FILES['lab_result']['tmp_name'],"./assets/patient/lab_result/".$file_name_uploadlab_result);
			     }	

				$save_in_patient_health['lab_result_doc']  = $file_name_uploadlab_result;
		    }

			// Upload Lab Pic    

			   if($_FILES['lab_picture'] ['name'] !='')
				{ 
					$file_name_uploadlab_image = $_FILES["lab_picture"]["name"];
					if(@is_uploaded_file($_FILES["lab_picture"]["tmp_name"]))
					 {
					   move_uploaded_file($_FILES['lab_picture']['tmp_name'],"./assets/patient/lab_image/".$file_name_uploadlab_image);
				     }	

				$save_in_patient_health['lab_pic']  = $file_name_uploadlab_image;
			    }

			   // Upload Other Pic    

			   if($_FILES['lab_document']['name'] !='')
				{ 
					$file_name_uploadlab_doc = $_FILES["lab_document"]["name"];
					if(@is_uploaded_file($_FILES["lab_document"]["tmp_name"]))
					 {
					   move_uploaded_file($_FILES['lab_document']['tmp_name'],"./assets/patient/other_documents/".$file_name_uploadlab_doc);
				     }	

					$save_in_patient_health['other_doc']  = $file_name_uploadlab_doc;

					$save_in_patient_health['adddate']  = date("Y-m-d H:i:s");
			    }
  
                  $save_in_patient_health['patient_id']=$this->input->post('patient_id');
		
		$update_basic = $this->patient_model->update_patient_demographic_edit($id,$save_in_patient_health,'patient_document');

		if($update_basic == '1')
			{
				$this->db->where('id',$id);
				$patient_document = $this->db->get('patient_document')->row();

			echo json_encode(array("status"=>'success', "msg"=>'Saved Successfully', "data"=>$patient_document));		
			}
			else
			{
				echo json_encode(array("status"=>'success', "msg"=>'Saved failed'));			
			}
	 }
 }




function delete_patient_document()
{
	$id =$this->input->post('id');
	$a = delete_data($id,'patient_document');

	if($a == '1')
	{
		echo json_encode(array("status"=>'success', "msg"=>'Delete Success'));
	}
	else
	{
		echo json_encode(array("status"=>'fail',  "msg"=>"Delete Failed"));	
	}
}


function my_prevoius_visit()
{
	$b = array();
	$patient_id =$this->input->post('patient_id');

	$this->db->where('patient_id',$patient_id);
	$this->db->where('appointment_date <',date("Y-m-d"));
	$patient_previos_visit =  $this->db->get('appointments')->result();

if(!empty($patient_previos_visit))
{
	foreach($patient_previos_visit as $row)
	{  
		$request_id=$row->request_id;
	    $patient_request=get_request_date($request_id);
	     if(!empty($patient_request[0]->disease_id))
		   {
		    $patient_disease=get_patient_disease($patient_request[0]->disease_id);
		    $dis=implode(',',$patient_disease);
		   }
		   else
		   {
		    $dis='';
		   }


	 if(!empty($patient_request[0]->sub_disease_id))
	   {

	  $patient_sub_disease=get_sub_dieases($patient_request[0]->sub_disease_id);
	  $subdis=implode(',',$patient_sub_disease);

	   }

	   else
	   {
	    $subdis='';
	   }



 if(!empty($patient_request[0]->doctor_type) && $patient_request[0]->doctor_type == '2')
  {
    $accept_id = 2;
    $doctor_id = $patient_request[0]->doctor_id;
  }
  else if(!empty($patient_request[0]->doctor_type) &&  $patient_request[0]->doctor_type== '3')
  {
    $accept_id = 3;
    $doctor_id = $patient_request[0]->doctor_id;
  }
if(!empty($doctor_id) && !empty($accept_id))
{

  $doctor_info=get_doctor_info($doctor_id,$accept_id);
}
else
{
$doctor_info='';

}


		$a['disease'] = $dis;
		$a['subdisease'] = $subdis;
		$a['date_time'] =  date("m-d-Y",strtotime($row->appointment_date)).'('.date("g:i a",strtotime($row->appointment_time)).')'; 

		$a['reason'] = $row->title;

		array_push($b,$a);

	}

	echo json_encode(array("status"=>'success', "data"=>$b));


}


		else
		{
			echo json_encode(array("status"=>'success', "data"=>$b));
		}



}


/************ Symtoms List **************/

function symtoms_with_subsymtoms()
{
	$refs = array();
	$list = array();
	//$categories = array();
    $row = $this->db->query('SELECT * FROM sub_disease');
    $res = $row->result();

    foreach($res as $p_cat)
    {
    // $ref = & $refs[$p_cat->id];
     $sub_data["id"] = $p_cat->id;
     $sub_data["name"] = $p_cat->sub_disease_name;
     $sub_data["disease_id"] = $p_cat->disease_id;

	$this->db->select('*');
    $this->db->from('disease');
    $this->db->where('id', $p_cat->disease_id);

	 $child = $this->db->get();
     $categories = $child->row();

     $d_name = $categories->name;

     // $data[] = $sub_data;

     $refs[$d_name]['children'][$p_cat->sub_disease_name] = & $ref;

  	}

	// foreach($data as $key => &$value)
	// {
	//  $output[$value->id] = &$value;
	// }


 //  foreach($data as $key => &$value)
	// {
	//  if($value->disease_id)
	//  {
	//   $output[$value["parent_id"]]["subsymtoms"][] = &$value;
	//  }
	// }
	//print_r($refs);
//echo json_encode($refs);
	 // return json_encode($categories);

    // 	$sub_cat = array();
    // 	$this->db->select('*');
    //     $this->db->from('sub_disease');
    //     $this->db->where('disease_id', $p_cat->disease_id);

    //     $child = $this->db->get();
    //     $categories = $child->result();

    //     foreach($categories as $p_subcat)
    //     {
    //     	$a['subcat_id'] = $p_subcat->id;
    //     	$a['sub_disease_name'] = $p_subcat->sub_disease_name;
 			// //$pbb['name'] = $sub_cat;
    //     	array_push($sub_cat, $a);   
    //     }
	  
    //   array_push($data, $aa); 
    // }

		
echo json_encode(array("status"=>'success', "data"=>$refs));


}

 

  public function sub_categories($id)
  {
  		$categories = array();

        $this->db->select('*');
        $this->db->from('sub_disease');
        $this->db->where('disease_id', $id);

        $child = $this->db->get();
        $categories = $child->result();
     
        foreach($categories as $p_cat)
        {
            $categories[$p_cat->id] = $this->sub_categories($p_cat->disease_id);
            
        }
        return $categories;       
    }





    // public function membersTree($parent_key)
    // {
    //     $row1 = [];
    //     $row = $this->db->query('SELECT * from sub_disease WHERE disease_id="'.$parent_key.'"')->result_array();
    
    //     foreach($row as $key => $value)
    //     {
    //        $id = $value['id'];
    //        $row1[$key]['id'] = $value['id'];
    //        $row1[$key]['sub_disease_name'] = $value['sub_disease_name'];
          
    //       // $row1[$key]['nodes'] = array_values($this->membersTree($value['id']));
    //     }
  
    //     return $row1;
    // }


function my_all_visit()
{
	$b = array();
	$patient_id =$this->input->post('patient_id');
	$myall_appointment = get_appointment_by_patient($patient_id);


if(!empty($myall_appointment))
{
	foreach($myall_appointment as $row)
	{  
		$request_id=$row->id;
		$dependent_id=$row->dependent_id;
		if(!empty($dependent_id))
		{
			$get_dependent_info = get_dependent_info_for_visit($dependent_id);
			if(!empty($get_dependent_info))
			{
				$dependent_name = $get_dependent_info[0]->dependent_first_name;
				$dependent_relationship = $get_dependent_info[0]->dependent_relationship;	
			}
			else
			{
				$dependent_name = '';
			     $dependent_relationship = '';
			}
			
		}
		else
		{
			$dependent_name = '';
			$dependent_relationship = '';
		}

		$get_patient_id_value = get_petient_info($patient_id);

		$patient_name = $get_patient_id_value[0]->first_name.' '.$get_patient_id_value[0]->last_name;


		$this->db->where('request_id',$request_id);
    	$get_patient_disease_by_request = $this->db->get('patient_symtoms_request_wise')->result();


		$dis_array=array();
		$subdis_ar=array();
		foreach ($get_patient_disease_by_request as $value)
		{
		   $disease_data = get_disease($value->disease_id);
		   $sub_disease_data = get_sub_dieases_by_id($value->sub_disease_id);
		   $disease_name = $disease_data[0]->name;
		   $subdisease_name = $sub_disease_data[0]->sub_disease_name;
		   array_push($dis_array,$disease_name); 
		   array_push($subdis_ar,$subdisease_name); 
		}


$dis = implode(",",$dis_array);
$subdis = implode(",",$subdis_ar);


		
		// if(!empty($row->disease_id))
		// {
		// 	$patient_disease=get_patient_disease($row->disease_id);
		// 	$dis=implode(',',$patient_disease);	
		// }
	   	
	 //   	if(!empty($row->sub_disease_id))
	 //   	{
		// 	$patient_sub_disease=get_sub_dieases($row->sub_disease_id);
		// 	$subdis=implode(',',$patient_sub_disease);   		
	 //   	}


	

	 if(!empty($row->doctor_type) && !empty($row->doctor_id))
	 {
	  $doctor_type=$row->doctor_type;
	  $usertype= get_user_type_info($doctor_type);
	  $doctor_info=get_doctor_info($row->doctor_id,$doctor_type);
	 }
	 else
	 {
	  $doctor_info='';
	  $usertype='';
	 }
  
	 if(!empty($request_id))
	 {
	 	$app =get_appointment_info($request_id);

	 	if(!empty($app))
	 	{
	 		$appointment_date = date('m-d-Y', strtotime($app[0]->appointment_date));
	        $appointment_time = date('g:i:a', strtotime($app[0]->appointment_time));	
	        $title = $app[0]->title;
	 	}
	 	else
	 	{
	 		$appointment_date = '';
	        $appointment_time = '';
	         $title = '';
	 	}

	  	

	 }

	  

	    if(!empty($doctor_info))
         {
          $doctor_name =  $doctor_info[0]->first_name; 
         }
         else
         {
           $doctor_name = 'Not Accepted Yet';
         }

	  if($row->is_accepted==1)
	  {
	  	$accepted = 'Accepted';
	  }
	  else
	  {
	  	$accepted = 'Not Accepted';
	  }



		$a['disease'] = $dis;
		$a['subdisease'] = $subdis;
		$a['doctor_name'] = $doctor_name;
		$a['date_time'] =  $appointment_date.'('.$appointment_time.')'; 
		$a['accepted'] = $accepted;

		$a['patient_name'] = $patient_name;
		$a['dependent_name'] = $dependent_name;
		$a['dependent_relationship'] = $dependent_relationship;
		$a['reason'] =  $title ;

		array_push($b,$a);

	}

	echo json_encode(array("status"=>'success', "data"=>$b));


}


else
{
	echo json_encode(array("status"=>'success', "data"=>$b));
}



}






 function send_mail()
		  { 
	        $this->load->library('email');
			$a = $this->email->from('admin@americanecare.com')
			     ->reply_to('admin@americanecare.com')
			     ->to('anmol.dmi@gmail.com')
			     ->subject("Subject")
			     ->message("Your Message")
			     ->set_mailtype('html')
			     ->send();

			if($a)
			{
				echo "mail send";
			}	
			else
			{
					echo "mail not send";
			}

	      } 


function mail()
{
	 $config = Array(
				  'protocol' => 'smtp',
				  'smtp_host' => 'smtp.livemail.co.uk',
				  'smtp_port' => 25,
				  'smtp_user' => 'info@americanecare.com', // change it to yours
				  'smtp_pass' => 'Mustapha@2018', // change it to yours
				  'mailtype' => 'html',
				  'charset' => 'iso-8859-1',
				  'wordwrap' => TRUE
				);

   //   $this->load->library('email', $config);
      $this->email->set_newline("\r\n");
      $this->email->from('info@americanecare.com'); // change it to yours
      $this->email->to('admin@americanecare.com');// change it to yours
      $this->email->subject('Welcome to AMERICAN ECARE ');
      $this->email->message('Hello This is test email');
	  if($this->email->send())
	  {
	  	echo "Mail Send";
	  }
	  else
	  {
	  	echo "Mail not send";
	  }

}



// ******** API FOR ALL STATE ***********//

function all_state()
{
	$country_id = 231;
	$b = array();
	$this->db->where('country_id',$country_id);
	$state = $this->db->get('states_new')->result();

	if(!empty($state))
	{
		foreach ($state as $value)
		 {
			$a['state_id'] = $value->id;
			$a['state_name'] = $value->name;
			array_push($b,$a);
	     }

		echo json_encode(array("status"=>'success', "data"=>$b));

	}
	else
	{
		echo json_encode(array("status"=>'fail', "data"=>$b));	
	}
	
}


// ******** API FOR ALL Diesase ***********//

function all_dieases()
{
	// $country_id = 231;
	$b = array();
	// $this->db->where('country_id',$country_id);
	// $state = $this->db->get('states_new')->result();
	$all_dieases = get_all_disease();

	if(!empty($all_dieases))
	{
		foreach ($all_dieases as $value)
		 {
			$a['dieases_id'] = $value->id;
			$a['dieases_name'] = $value->name;

			array_push($b,$a);
	     }

		echo json_encode(array("status"=>'success', "data"=>$b));

	}
	else
	{
		echo json_encode(array("status"=>'fail', "data"=>$b));	
	}
	
}

// ************ GET SUBDiease*******//
function all_sub_dieases()
{
	$dieases_id = $_POST['dieases_id'];

	$b = array();

	$all_subdieases = get_all_subdisease($dieases_id);

	if(!empty($all_subdieases))
	{
		foreach ($all_subdieases as $value)
		 {
			$a['subdieases_id'] = $value->id;
			$a['sub_disease_name'] = $value->sub_disease_name;

			array_push($b,$a);
	     }

		echo json_encode(array("status"=>'success', "data"=>$b));

	}
	else
	{
		echo json_encode(array("status"=>'fail', "data"=>$b));	
	}
	
}


//************ API FOR Pharmacy ***************/

function all_pharmacy()
{
	$zipcode = $_POST['zipcode'];
	$b = array();
	$all_pharmacy = get_pharmacy_by_pincode($zipcode);

	if(!empty($all_pharmacy))
	{
		foreach ($all_pharmacy as $value)
		 {
			$a['pharmacy_id'] = $value->Pharmacy_NCPDP;
			$a['Pharmacy_StoreName'] = $value->Pharmacy_StoreName;
			array_push($b,$a);
	     }

		echo json_encode(array("status"=>'success', "data"=>$b, "msg"=>"Pharmacy found"));

	}
	else
	{
		echo json_encode(array("status"=>'fail', "msg"=>"No Pharmacy found in your location"));	
	}
	
}


//************ API FOR Pharmacy Description***************/

function pharmacy_description()
{
	$pharmacy_id = $_POST['pharmacy_id'];
	$b = array();
	$all_pharmacy_detail = get_pharmacy_detail($pharmacy_id);

	if(!empty($all_pharmacy_detail))
	{
		// foreach ($all_pharmacy as $value)
		//  {
			$a['pharmacy_id'] = $all_pharmacy_detail->Pharmacy_NCPDP;
			$a['Pharmacy_StoreName'] = $all_pharmacy_detail->Pharmacy_StoreName;
			$a['Pharmacy_City'] = $all_pharmacy_detail->Pharmacy_City;
			$a['Pharmacy_address'] = $all_pharmacy_detail->Pharmacy_Address1;
			$a['Pharmacy_StateAbbr'] = $all_pharmacy_detail->Pharmacy_StateAbbr;
			$a['Pharmacy_Zip'] = $all_pharmacy_detail->Pharmacy_Zip;
			$a['Pharmacy_Telephone1'] = $all_pharmacy_detail->Pharmacy_Telephone1;

			array_push($b,$a);
	     // }

		echo json_encode(array("status"=>'success', "data"=>$b));

	}
	else
	{
		echo json_encode(array("status"=>'fail', "data"=>$b));	
	}
	
}



//************ API FOR CALCULATE BMI ***************/

function bmi_calculate()
{
	$zipcode = $_POST['zipcode'];

	$b = array();

	$all_pharmacy = get_pharmacy_by_pincode($zipcode);

	if(!empty($all_pharmacy))
	{
		foreach ($all_pharmacy as $value)
		 {
			$a['pharmacy_id'] = $value->Pharmacy_NCPDP;
			$a['Pharmacy_StoreName'] = $value->Pharmacy_StoreName;

			array_push($b,$a);
	     }

		echo json_encode(array("status"=>'success', "data"=>$b));

	}
	else
	{
		echo json_encode(array("status"=>'fail', "data"=>$b));	
	}
	
}


// ******** API FOR ALL CITY ***********//

function all_city()
{
	$state_id = $_POST['state_id'];
	$b = array();
	$this->db->where('state_id',$state_id);
	$city = $this->db->get('cities_new')->result();

	if(!empty($city))
	{
		foreach ($city as $value)
		 {
			$a['city_id'] = $value->id;
			$a['city_name'] = $value->name;

			array_push($b,$a);
	     }

		echo json_encode(array("status"=>'success', "data"=>$b));

	}
	else
	{
		echo json_encode(array("status"=>'fail', "data"=>$b));	
	}

}

// ******** API FOR ALL ZONE ***********//

function all_zone()
{
	//$state_id = $_POST['state_id'];
	$b = array();
	//$this->db->where('state_id',$state_id);
	$zone = $this->db->get('BusinessHours')->result();

	if(!empty($zone))
	{
		foreach ($zone as $value)
		 {
			$a['zone_id'] = $value->id;
			$a['zone_name'] = $value->zone;

			array_push($b,$a);
	     }

		echo json_encode(array("status"=>'success', "data"=>$b));

	}
	else
	{
		echo json_encode(array("status"=>'fail', "data"=>$b));	
	}

}



// ******** API FOR Get Visit type ***********//

function get_visit_type()
{
	//$state_id = $_POST['state_id'];
	$b = array();
	//$this->db->where('state_id',$state_id);
	$visit_type = get_visit_type();

	if(!empty($visit_type))
	{
		foreach ($visit_type as $value)
		 {
			$a['visit_type_id'] = $value->id;
			$a['visit_type_name'] = $value->visit_type_name;

			array_push($b,$a);
	     }

		echo json_encode(array("status"=>'success', "data"=>$b));

	}
	else
	{
		echo json_encode(array("status"=>'fail', "data"=>$b));	
	}

}

function get_visit_type_price()
{
	//$state_id = $_POST['state_id'];
	 $b = array();
	//$this->db->where('state_id',$state_id);
	 $visit_id = $this->input->post('visit_id');
	 $get_visit_price = get_visit_price($visit_id);
	
  if(!empty($get_visit_price))
	{
	 $a['visit_name'] = $get_visit_price[0]->visit_type_name;
	 $a['price'] = $get_visit_price[0]->visit_type_price;

	 array_push($b,$a);
	  
	 echo json_encode(array("status"=>'success', "data"=>$b));

	}
	else
	{
		echo json_encode(array("status"=>'fail', "data"=>$b));	
	}

}


// *********** CHECK GROUP DISCOUNT **************//


function group_discount()
{
	$code = $this->input->post('code');
	$patient_id = $this->input->post('patient_id');
	$get_discount = get_discount($code,$patient_id);

	if(!empty($code))
	{
	 if(empty($get_discount))
	  {
	   echo json_encode(array("status"=>'fail', "msg"=>'Coupan not found', "discount_amount"=>0));	
      }
	  else
	  {
	  	if($get_discount == "used")
	  	{
	  	 echo json_encode(array("status"=>'fail', "msg"=>'Coupan already applied', "discount_amount"=>0));	
	  	}
	  	else
	  	{
	  	 $group_discount = $get_discount->discount;
	     echo json_encode(array("status"=>'success', "msg"=>'Coupan applied', "discount_amount"=>$group_discount));		
	  	}

	  	
	  }
	}
	else
	{
		 echo json_encode(array("status"=>'fail', "msg"=>'Please Enter Code', "discount_amount"=>0));
	}


}



// *********** CHECK GROUP DISCOUNT **************//


function get_bmi()
{
	$height_ft = $this->input->post('height_ft');
	$height_in = $this->input->post('height_in');
	$weight = $this->input->post('weight');

	if(!empty($height_ft) && !empty($height_in) && !empty($weight))
	{
	    $height_inch = $height_ft*12;
		$total= $height_in + $height_inch;
		$bmi = (703*$weight/($total*$total));
		$bmi_round = round($bmi, 2);

	   echo json_encode(array("status"=>'success', 'msg'=>'Calculate Successfully', "bmi"=>$bmi_round, "height_in_cm"=>$total));	
	}
	else
	{
	  echo json_encode(array("status"=>'fail', 'msg'=>'Please Enter Value', "bmi"=>0));	
	}

}

// *********** GET All Genral Medicine **************//


function get_all_general_medicine()
{
	$all_list = get_all_general_medicine();
	$b = array();

 	if(!empty($all_list))
	{
		foreach ($all_list as $value)
		 {
			 $a['id'] = $value->id;
			 $a['name'] = $value->name;
			 array_push($b,$a);
		}
		 echo json_encode(array("status"=>'success', "data"=>$b));
	}
	else
	{
		echo json_encode(array("status"=>'fail', "data"=>$b));	
	}
}

// *********** GET All Speciality **************//


function get_all_specailty()
{
	$speciality = get_all_specailty_doctor();
	$b = array();

 	if(!empty($speciality))
	{
		foreach ($speciality as $value)
		 {
			 $a['id'] = $value->id;
			 $a['speciality_name'] = $value->speciality_name;
			 array_push($b,$a);
		}
		 echo json_encode(array("status"=>'success', "data"=>$b));
	}
	else
	{
		echo json_encode(array("status"=>'fail', "data"=>$b));	
	}
}


// *********** GET All Speciality **************//


function get_all_therapy_coaching()
{
	$all_therapy_coaching = get_all_therapy_coaching();
	$b = array();

 	if(!empty($all_therapy_coaching))
	{
		foreach ($all_therapy_coaching as $value)
		 {
			 $a['id'] = $value->id;
			 $a['name'] = $value->name;
			 array_push($b,$a);
		}
		 echo json_encode(array("status"=>'success', "data"=>$b));
	}
	else
	{
		echo json_encode(array("status"=>'fail', "data"=>$b));	
	}
}



// GET Doctor Available Time


function get_all_doctor_time()
{
	
	$patient_id = $_POST['patient_id'];

	$patient_zone = get_petient_info($patient_id);
	$pat_zone = $patient_zone[0]->zone; 

	$weekdays = array(
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri"
    );
     $workeend = array(
        "Sat",
        "Sun"
    );

    $date = date('Y-m-d');

    $today=date('D', strtotime($date));

    if (in_array($today, $weekdays))
	 {
		  if(!empty($pat_zone))
		  {
		     $zone_info=get_zone_by_id($pat_zone); 
		     if(!empty($zone_info))
		     {
			    $zone_start_time=$zone_info->week_start_time;
			    $zone_end_time=$zone_info->week_end_time;
		     }
		  }
    }


    elseif(in_array($today, $workeend))
    {
	    if(!empty($pat_zone))
	    {
	      $zone_info=get_zone_by_id($pat_zone); 
	      if(!empty($zone_info))
	       {
	         $zone_start_time=$zone_info->weekend_start_time;
	         $zone_end_time=$zone_info->weekend_end_time;
	       }
	    }
   }


  // echo date("h:i A", strtotime($zone_start_time));	die;	


 //    $a= $zone_start_time;
	// $b= $zone_end_time;
	// $start=explode(':',$a);
	// $end=explode(':',$b);
	// $startloop=$start[0];
	// $endloop=$end[0];

// //ini_set('memory_limit', '-1');
// $start = strtotime($zone_start_time);
// $end = strtotime($zone_end_time);

// $b = array();
// while ($start !== $end)
// {
//  $start = strtotime('+1 hour',$start);
//  $b[] = date('h:ia', $start);
// }
	

$i= 0;
$b=array();

for($zone_start_time; $zone_start_time<=$zone_end_time;$zone_start_time++)
{
	$array_a['available_time'] = date("h.iA", strtotime("$zone_start_time:00"));
    array_push($b,$array_a);
}


// for($startloop; $startloop<=$endloop ; $startloop++)
//         {
//            if($startloop< 12)
//            {
//             $mytime=$startloop;
//             $endtime='am';
//             $a = $mytime;
//            }
//            elseif($startloop> 12)
//            {
//              $mytime=$startloop-12;
//              $endtime='pm';
//              $a = $mytime;
//            }
//            elseif($startloop==12)
//            {
//              $mytime=12;
//              $endtime='pm';
//              $a = $mytime;
//            }
//            $i++;
//           $array_a['available_time'] = $a.' '.$endtime;
//           array_push($b,$array_a);
// 		}
		
echo json_encode(array("status"=>'success', "data"=>$b));



}






// *********** GET Avialiable doctor By Visit Type **************//


function available_doctors_by_visit_type()
{
	$b = array();
	$visit_type = $this->input->post('visit_type');
	$state = $this->input->post('state');
	$currentdatetime = $this->input->post('currentdatetime');
	$request_type = $this->input->post('request_type');


	$ci =& get_instance();	
    //$class = $ci->db->query("select * from `doctor_specialties` where FIND_IN_SET('$visit_type',visit_type) AND (dea_state1='$state' OR dea_state2='$state' OR dea_state3='$state' OR dea_state4='$state' OR dea_state5='$state' OR dea_state6='$state' OR dea_state7='$state')");

    $class = $ci->db->query("SELECT * FROM doctor_spaciality_new WHERE FIND_IN_SET('$visit_type',visit_type) AND dea_state = '".$state."'");

    $rows = $class->result();

    if(!empty($rows))
    {
	    foreach ($rows as $value) 
	    {
	       $doctor_id = $value->doctor_id;

		$ci2 =& get_instance();	
	   // $class2 = $ci2->db->query("SELECT * FROM doctors WHERE id = '".$doctor_id ."'");
		//$class2 = $ci2->db->query("SELECT * FROM calendar_events WHERE doctor_id = '".$doctor_id."' AND  start <= '".$currentdatetime."' AND end >= '".$currentdatetime."'");


		if($request_type == 1)
		{
		  $class2 = $ci2->db->query("SELECT * FROM doctors WHERE id = '".$doctor_id."' AND login_status ='1' AND status = '1'");
		}

		if($request_type == 0)
		{
		 $class2 = $ci2->db->query("SELECT * FROM calendar_events INNER JOIN doctors ON calendar_events.doctor_id =  doctors.id WHERE calendar_events.doctor_id = '".$doctor_id."' AND calendar_events.start <= '".$currentdatetime."' AND calendar_events.end >= '".$currentdatetime."' AND doctors.clock_status = '0' AND doctors.status = '1'");
		}

	    $num_rows = $class2->num_rows;

		    if($num_rows > 0)
		    {
		    	$doctor_info = get_doctor_info_for_app($doctor_id,2);
		    	$a['doc_name'] = $doctor_info[0]->first_name. ' '. $doctor_info[0]->middle_name.' '.$doctor_info[0]->last_name;	
				$a['doc_id'] = $doctor_info[0]->id;	
				array_push($b,$a);	 
		    }

			 	
	    }

	   echo json_encode(array("status"=>'success', "data"=>$b)); 

	}
	else
	{
		 echo json_encode(array("status"=>'fail', "data"=>$b)); 
	}

     
}


// *********** GET Avialiable doctor By therapy coaching **************//


function available_doctors_by_therapy_coaching()
{
	$b = array();
	$visit_type = $this->input->post('visit_type');
	$therapy_coaching_id = $this->input->post('therapy_coaching_id');
	$state = $this->input->post('state');
	$currentdatetime = $this->input->post('currentdatetime');
	$request_type = $this->input->post('request_type');

	$ci =& get_instance();	
    //$class = $ci->db->query("select * from `doctor_specialties` where FIND_IN_SET('$visit_type',visit_type) AND FIND_IN_SET('$therapy_coaching_id',visit_type_sub) AND (dea_state1='$state' OR dea_state2='$state' OR dea_state3='$state' OR dea_state4='$state' OR dea_state5='$state' OR dea_state6='$state' OR dea_state7='$state')");

    $class = $ci->db->query("SELECT * FROM doctor_spaciality_new WHERE FIND_IN_SET('$visit_type',visit_type) AND FIND_IN_SET('$therapy_coaching_id',visit_type_sub) AND dea_state = '".$state."' ");

    $rows = $class->result();

    if(!empty($rows))
    {
	    foreach ($rows as $value) 
	    {
	      $doctor_id = $value->doctor_id;

		$ci2 =& get_instance();	
	   // $class2 = $ci2->db->query("SELECT * FROM doctors WHERE id = '".$doctor_id ."'");
	//	$class2 = $ci2->db->query("SELECT * FROM calendar_events WHERE doctor_id = '".$doctor_id."' AND start <= '".$currentdatetime."' AND end >= '".$currentdatetime."'");

		//$class2 = $ci2->db->query("SELECT * FROM calendar_events INNER JOIN doctors ON calendar_events.doctor_id =  doctors.id WHERE doctor_id = '".$doctor_id."' AND start <= '".$currentdatetime."' AND end >= '".$currentdatetime."' AND clock_status = '0'");

		if($request_type == 1)
			{
			$class2 = $ci2->db->query("SELECT * FROM doctors WHERE id = '".$doctor_id."' AND login_status ='1' AND status = '1'");
			}	
			if($request_type == 0)
			{
			$ci2->db->query("SELECT * FROM calendar_events INNER JOIN doctors ON calendar_events.doctor_id =  doctors.id WHERE calendar_events.doctor_id = '".$doctor_id."' AND calendar_events.start <= '".$currentdatetime."' AND calendar_events.end >= '".$currentdatetime."' AND doctors.clock_status = '0' AND doctors.status = '1'");

			}


	    $num_rows = $class2->num_rows;

		    if($num_rows > 0)
		    {
		    	$doctor_info = get_doctor_info_for_app($doctor_id,2);
		    	$a['doc_name'] =  $doctor_info[0]->first_name. ' '. $doctor_info[0]->middle_name.' '.$doctor_info[0]->last_name;	
				$a['doc_id'] = $doctor_info[0]->id;	
				array_push($b,$a);	 	
		    }

	    }

	   echo json_encode(array("status"=>'success', "data"=>$b)); 
	}
	else
	{
		 echo json_encode(array("status"=>'fail', "data"=>$b)); 
	}
    
}


// *********** GET Avialiable doctor By Specialty **************//


function available_doctors_by_speicality()
{
	$b = array();
	$speciality = $this->input->post('speciality');
	$state = $this->input->post('state');
	$currentdatetime = $this->input->post('currentdatetime');
	$request_type = $this->input->post('request_type');

	$ci =& get_instance();	
   // $class = $ci->db->query("select * from `doctor_specialties` where doctor_specialities ='$speciality'  and (dea_state1='$state' OR dea_state2='$state' OR dea_state3='$state' OR dea_state4='$state' OR dea_state5='$state' OR dea_state6='$state' OR dea_state7='$state')");

$class = $ci->db->query("SELECT * FROM doctor_spaciality_new WHERE doctor_specialities ='$speciality' AND dea_state = '".$state."'");

    $rows = $class->result();

    if(!empty($rows))
    {
	    foreach ($rows as $value) 
	    {
	      $doctor_id = $value->doctor_id;

		$ci2 =& get_instance();	
	   // $class2 = $ci2->db->query("SELECT * FROM doctors WHERE id = '".$doctor_id ."'");
		//$class2 = $ci2->db->query("SELECT * FROM calendar_events WHERE doctor_id = '".$doctor_id."' AND  start <= '".$currentdatetime."' AND end >= '".$currentdatetime."'");
		if($request_type == 1)
			{
			$class2 = $ci2->db->query("SELECT * FROM doctors WHERE id = '".$doctor_id."' AND login_status ='1' AND status = '1'");
			}	
			if($request_type == 0)
			{
			$class2 = $ci2->db->query("SELECT * FROM calendar_events INNER JOIN doctors ON calendar_events.doctor_id =  doctors.id WHERE calendar_events.doctor_id = '".$doctor_id."' AND calendar_events.start <= '".$currentdatetime."' AND calendar_events.end >= '".$currentdatetime."' AND doctors.clock_status = '0' AND doctors.status = '1'");
			}

	    $num_rows = $class2->num_rows;
	 

		    if($num_rows > 0)
		    {
		    	$doctor_info = get_doctor_info_for_app($doctor_id,2);
		    	$a['doc_name'] =  $doctor_info[0]->first_name. ' '. $doctor_info[0]->middle_name.' '.$doctor_info[0]->last_name;	
				$a['doc_id'] = $doctor_info[0]->id;	
				array_push($b,$a);	 
		    }

	    }

	   echo json_encode(array("status"=>'success', "data"=>$b)); 
	}
	else
	{
		 echo json_encode(array("status"=>'fail', "data"=>$b)); 
	}

     
}


// *********** GET Avialiable doctor By Specialty **************//


function available_doctors_by_general_medicine()
{
	$b = array();
	$visit_type = $this->input->post('visit_type');
	$general_medicine = $this->input->post('general_medicine');
	$state = $this->input->post('state');
	$currentdatetime = $this->input->post('currentdatetime');
	$request_type = $this->input->post('request_type');


	$ci =& get_instance();	
   // $class = $ci->db->query("select * from `doctor_specialties` where FIND_IN_SET('$visit_type',visit_type) AND FIND_IN_SET('$general_medicine',general_specialities) AND (dea_state1='$state' OR dea_state2='$state' OR dea_state3='$state' OR dea_state4='$state' OR dea_state5='$state' OR dea_state6='$state' OR dea_state7='$state')");

	   $class = $ci->db->query("SELECT * FROM doctor_spaciality_new WHERE FIND_IN_SET('$visit_type',visit_type) AND  FIND_IN_SET('$general_medicine',general_specialities) AND dea_state = '".$state."'");

    $rows = $class->result();

    if(!empty($rows))
    {
	    foreach ($rows as $value) 
	    {
	      $doctor_id = $value->doctor_id;

		$ci2 =& get_instance();	
	   // $class2 = $ci2->db->query("SELECT * FROM doctors WHERE id = '".$doctor_id ."'");
		//$class2 = $ci2->db->query("SELECT * FROM calendar_events WHERE doctor_id = '".$doctor_id."' AND  start <= '".$currentdatetime."' AND end >= '".$currentdatetime."'");

		if($request_type == 1)
			{
			$class2 = $ci2->db->query("SELECT * FROM doctors WHERE id = '".$doctor_id."' AND login_status ='1' AND status = '1'");
			}	
			if($request_type == 0)
			{
			$class2 = $ci2->db->query("SELECT * FROM calendar_events INNER JOIN doctors ON calendar_events.doctor_id =  doctors.id WHERE calendar_events.doctor_id = '".$doctor_id."' AND calendar_events.start <= '".$currentdatetime."' AND calendar_events.end >= '".$currentdatetime."' AND doctors.clock_status = '0' AND doctors.status = '1'");
			}


	    $num_rows = $class2->num_rows;

		    if($num_rows > 0)
		    {
		    	$doctor_info = get_doctor_info_for_app($doctor_id,2);
		    	$a['doc_name'] =  $doctor_info[0]->first_name. ' '. $doctor_info[0]->middle_name.' '.$doctor_info[0]->last_name;		
				$a['doc_id'] = $doctor_info[0]->id;	
				array_push($b,$a);	 	
		    }

			
	    }

	   echo json_encode(array("status"=>'success', "data"=>$b)); 
	}
	else
	{
		 echo json_encode(array("status"=>'fail', "data"=>$b)); 
	}

     
}





// *********** CHECK EMPLOYER DISCOUNT **************//


function employer_discount()
{
	$code = $this->input->post('code');
	$get_discount = get_emp_discount($code);

	if(!empty($code))
	{
	 if(empty($get_discount))
	  {
	  //	echo "0";
	   echo json_encode(array("status"=>'fail', "msg"=>'Coupan not found', "discount_amount"=>0));	
      }
	  else
	  {

	  	if($get_discount == "used")
	  	{
 		 echo json_encode(array("status"=>'fail', "msg"=>'Coupan already applied', "discount_amount"=>0));	
	  	}
	  	else
	  	{
	  	 $group_discount = $get_discount->discount;
	     echo json_encode(array("status"=>'success', "msg"=>'Coupan applied', "discount_amount"=>$group_discount));			
	  	}

	  
	  }
	}
	else
	{
		 echo json_encode(array("status"=>'fail', "msg"=>'Please Enter Code', "discount_amount"=>0));
	}
}


function check_ex()
{
 print_r(get_loaded_extensions());
}


function save_demo()
{
	$patient_id = '1';
	$request_id = '267';
	$dependent_id = '180';

	$sub_disease_id = '1, 2';
  	$exploded_sub_disease_id = explode(",", $sub_disease_id);
  //print_r($exploded_sub_disease_id);

  	foreach ($exploded_sub_disease_id as $value) 
  	{
		$ci2 =& get_instance();	
	    $class2 = $ci2->db->query("SELECT * FROM sub_disease WHERE id = '".$value ."'");
	   	$rows = $class2->row();

	   	$dieases_id = $rows->disease_id;


	   	$data = array(
	   		"patient_id"=>$patient_id,
	   		"request_id"=>$request_id,
	   		"dependent_id"=>$dependent_id,
	   		"disease_id"=>$dieases_id,
	   		"sub_disease_id"=>$value
	   	);



	   	if($this->db->insert('patient_symtoms_request_wise',$data))
	   	{
	   		echo "saved";
	   	}
	   	else
	   	{
	   		echo "not";
	   	}


  	}

}



//*********** API FOR BOOKING***************/

function booking_visit()
{	
	//header('Content-Type: application/json');
	$date = date('Y-m-d H:i:s');

	$total=$this->input->post('total');
	$device=$this->input->post('device');
 //  card Detail
   $card_holder_name = $this->input->post('card_holder_name');
   $credit_card_number = $this->input->post('credit_card_number');

   $card_country = $this->input->post('card_country');
   $card_state = $this->input->post('card_state');
   $card_city = $this->input->post('card_city');
   $card_zipcode = $this->input->post('card_zipcode');
   $credit_billing_address = $this->input->post('billing_address');


   $year=$this->input->post('expiration_year');
   $expire_month=$this->input->post('expiration_date');

   $expiration_date = $year.'-'.$expire_month;
   $cvc = $this->input->post('cvc');



	/************** for Payment credit card information	********************/

if($device == 'ios')
{
	$card_number = $this->input->post('credit_card_number'); 
}
else
{
	$card_number_n = $this->input->post('credit_card_number');	
    $card_number = str_replace(" ", "", $card_number_n);
	
}
   
  
   $patient_id=$this->input->post('patient_id');

   $check = payment_gateway($patient_id,$total,$card_holder_name,$card_number,$expiration_date,$cvc,$credit_billing_address,$card_country,$card_state,$card_city,$card_zipcode);
 
	$n = json_decode($check);

	$card_status = $n->status;
	//$card_status = 'success';
	$card_message = $n->error_message;
	//$card_message = 'ok';

	if($card_status == "fail")
	{
		$cardmsg = "Payment failed: ".$card_message;
	    echo json_encode(array("status"=>'fail', "msg"=>$cardmsg));	
	}
	else
	{

	$patient_id = $this->input->post('patient_id');
	$pharmacy_id = $this->input->post('pharmacy_id');
	$pharmacy_zipcode = $this->input->post('pharmacy_zipcode');

	// For Pharmacy save
	$data_for_pharmacy = array(
		'patient_id'=>$patient_id,
		'pharmacy_id'=>$pharmacy_id,
		'patient_pharmacy_zip'=>$pharmacy_zipcode,
	);

	if($this->input->post('pharmacy_id') != '' && $this->input->post('pharmacy_zipcode') != '')
       	{
       		$this->db->insert('patient_pharmacy',$data_for_pharmacy);	
       	}

    $start_date=$this->input->post('booking_date');    	
    $mydata=explode('-', $start_date);
    $newdate=$mydata[2].'-'.$mydata[0].'-'.$mydata[1];
    $new_start_time=$this->input->post('booking_time');
	$start_time = date('H:i:s',strtotime($new_start_time));
    $book_date_time=$newdate.' '.$start_time;
	$reason_visit=$this->input->post('reason_visit');
	$current_health_concern=$this->input->post('current_health_concern');
	$status=0;
	$is_closed=0;

	$event_calander = array(
		'user_id'=>$patient_id,
		'doctor_id'=>'',
		'user_type'=>'',
		'title'=>$reason_visit,
		'start'=>$book_date_time,
		'end'=>$book_date_time,
		'description'=>$current_health_concern
	);

$register_in_event_calander = $this->patient_model->book_calander_event_save($event_calander,'calendar_events');
$event_id=$register_in_event_calander;


$now = date('Y-m-d H:i:s');
$save['patient_id'] = $this->input->post('patient_id');
$save['dependent_id'] = $this->input->post('dependent_id');
  	
  	//$save['disease_id'] = $this->input->post('disease_id');
  	//$save['disease_id'] = '1, 2';





 //  	if(is_array($this->input->post('sub_symptoms')))
	// {
	// 	$save['sub_disease_id'] = implode(",", $this->input->post('sub_symptoms'));
	// }
	// else
	// {
	// 	$save['sub_disease_id'] = $this->input->post('sub_symptoms');
	// }



    $save['country_id'] = $this->patient_model->get_country_from_patient($this->input->post('patient_id'));
	$save['state_id'] = $this->patient_model->get_state_from_patient($this->input->post('patient_id'));	
	$save['event_id'] =$event_id; 	

	$save['visit_type'] = $this->input->post('visit_type');
	$save['request_type'] = $this->input->post('request_type');
	$save['speciality_list'] = $this->input->post('speciality_list');
	$save['therapy_coaching'] = $this->input->post('therapy_coaching');
	$save['estimate_visit_cost'] = $this->input->post('estimate_visit_cost');
	$save['employer_discount_id'] = $this->input->post('employer_discount_id');
	$save['group_discount_id'] = $this->input->post('group_discount_id');
	$save['doctor_id']=$this->input->post('doctor_id');
	//$save['doctor_type']=$this->input->post('my_user_type');
	$save['doctor_type']=2;
	$save['symptoms_duration']=$this->input->post('duration');

	$save['dependent_id']=$this->input->post('dependent_id');
	$save['weight']=$this->input->post('weight');
	$save['height_in']=$this->input->post('height_in');
	$save['height_ft']=$this->input->post('height_ft');
	$save['bmi']=$this->input->post('bmi');
	$save['bp_low']=$this->input->post('bp_low');
	$save['bp_high']=$this->input->post('bp_high');
	$save['temprature']=$this->input->post('temprature');
	$save['pulse']=$this->input->post('pulse');
	$save['o2sat']=$this->input->post('o2sat');

	//$save['created_at'] = $now;$book_date_time
	$save['created_at'] =$book_date_time;
	$save['updated_at'] = $now;
	$save['status'] = '0';  		

   // Patient Insurance
  
  	$save_insurance['patient_id'] = $this->input->post('patient_id');
    $save_insurance['insurance_name'] = $this->input->post('insurance_name');
    $save_insurance['subscriber_name'] = $this->input->post('subscriber_name');
    $save_insurance['identification_no'] = $this->input->post('identification_number');
    $save_insurance['group_number'] = $this->input->post('group_number');
    $save_insurance['rxbin'] = $this->input->post('rxbin');
    $save_insurance['rxpcn'] = $this->input->post('rxpcn');
    $save_insurance['rxgrp'] = $this->input->post('rxgrp');

    $save_insurance['adddate'] = date('Y-m-d H:i:s');

	$new_date= $this->input->post('demographic_dob');

	if(!empty($new_date))
	{
		$my_date= explode('-', $new_date);
   		 $save_demography['demographic_dob'] = $my_date[2].'-'.$my_date[0].'-'.$my_date[1];
	}

    $save_demography['demographic_gender'] = $this->input->post('demographic_gender');
    $save_demography['demographic_language'] = $this->input->post('demographic_language');
    //$patient_id = $this->input->post('patient_id');
    $save_demography['patient_id'] = $this->input->post('patient_id');
   // if($_FILES['patient_picture']['name'] !='')
    


  //    if(!empty($_FILES['patient_picture']['name']))
		// { 
		// 	$file_name_uploadlab_result = $_FILES["patient_picture"]["name"];

		// 	if(@is_uploaded_file($_FILES["patient_picture"]["tmp_name"]))
		// 	 {
		// 	   move_uploaded_file($_FILES['patient_picture']['tmp_name'],"./assets/patient/".$file_name_uploadlab_result);
		//      }	

		// 	 $save_demography['demographic_image']  = $file_name_uploadlab_result;
	 //    }


 if($device == 'ios')
 {
 	if(!empty($_FILES['patient_picture']['name']))
		{ 
			$file_name_uploadlab_result = $_FILES["patient_picture"]["name"];

			if(@is_uploaded_file($_FILES["patient_picture"]["tmp_name"]))
			 {
			   move_uploaded_file($_FILES['patient_picture']['tmp_name'],"./assets/patient/".$file_name_uploadlab_result);
		     }	

			 $save_demography['demographic_image']  = $file_name_uploadlab_result;
	    }

 }   

else
{
		if(!empty($this->input->post("patient_picture")))
		{
			$image = base64_decode($this->input->post("patient_picture"));
			$image_name = md5(uniqid(rand(), true));
			$filename = $image_name . '.' . 'png';

			$path = "./assets/patient/".$filename;

			//image uploading folder path
			file_put_contents($path, $image);

			$save_demography['demographic_image'] =  $filename;
		}
		else
		{
			$save_demography['demographic_image'] =  '';
		}
  }  


	// Patient Insurance End
   $p_insurance = $this->patient_model->save_insurance($save_insurance['patient_id'],$save_insurance,'patient_insurance');

   $p_demograpy = $this->patient_model->save_demography($patient_id,$save_demography,'patient_demographic');

   $p_key = $this->patient_model->book_appointment_save($save,'patient_medical_request');
   $save2['patient_id'] = $this->input->post('patient_id');
   $save2['dependent_id'] = $this->input->post('dependent_id');
   $save2['medical_weight']=$this->input->post('weight');
   $save2['medical_height']=$this->input->post('height_ft');
   $save2['medical_height_in']=$this->input->post('height_in');
   $save2['medical_bmi']=$this->input->post('bmi');
   $save2['bp_low']=$this->input->post('bp_low');
   $save2['bp_high']=$this->input->post('bp_high');
   $save2['temp']=$this->input->post('temprature');
   $save2['pulse']=$this->input->post('pulse');
   $save2['o2sat']=$this->input->post('o2sat');

   $this->db->insert('patient_medical_history',$save2);

	if($p_key)
	{
	  // save data
	  $request_id = $p_key;



$sub_disease_id = $this->input->post('sub_symptoms');

  	$exploded_sub_disease_id = explode(",", $sub_disease_id);

  	foreach ($exploded_sub_disease_id as $value) 
  	{
		$ci2 =& get_instance();	
	    $class2 = $ci2->db->query("SELECT * FROM sub_disease WHERE id = '".$value."'");
	   	$rows = $class2->row();

		if(!empty($rows->disease_id))
		{
			$dieases_id = $rows->disease_id;
		}
		else
		{
			$dieases_id = '';
		}
	

	   	$data = array(
	   		"patient_id"=>$patient_id,
	   		"request_id"=>$request_id,
	   		"dependent_id"=>$save['dependent_id'],
	   		"disease_id"=>$dieases_id,
	   		"sub_disease_id"=>$value
	   	);

	   $this->db->insert('patient_symtoms_request_wise',$data);
}

  	//}




//  if(is_array($this->input->post('sub_symptoms')))
// 	{

//   	$sub_disease_id = $this->input->post('sub_symptoms');

//   	$exploded_sub_disease_id = explode(",", $sub_disease_id);

//   	foreach ($exploded_sub_disease_id as $value) 
//   	{
// 		$ci2 =& get_instance();	
// 	    $class2 = $ci2->db->query("SELECT * FROM sub_disease WHERE id = '".$value."'");
// 	   	$rows = $class2->row();

// 	   	$dieases_id = $rows->disease_id;

// 	   	$data = array(
// 	   		"patient_id"=>$patient_id,
// 	   		"request_id"=>$request_id,
// 	   		"dependent_id"=>$save['dependent_id'],
// 	   		"disease_id"=>$dieases_id,
// 	   		"sub_disease_id"=>$value
// 	   	);

// 	   $this->db->insert('patient_symtoms_request_wise',$data);

//   	}

// }


// else
// {
// 	$sub_disease_id = $this->input->post('sub_symptoms');

// 	$ci2 =& get_instance();	
// 	$class2 = $ci2->db->query("SELECT * FROM sub_disease WHERE id = '".$sub_disease_id."'");
// 	$rows = $class2->row();

// 	$dieases_id = $rows->disease_id;

// 	$data = array(
// 	   		"patient_id"=>$patient_id,
// 	   		"request_id"=>$request_id,
// 	   		"dependent_id"=>$save['dependent_id'],
// 	   		"disease_id"=>$dieases_id,
// 	   		"sub_disease_id"=>$sub_disease_id
// 	   	);

// 	$this->db->insert('patient_symtoms_request_wise',$data);


// }



	  $save_in_appointment['request_id'] = $request_id;
	  $save_in_appointment['title'] = $this->input->post('reason_visit');
	  $udate = $this->input->post('booking_date');
	  $utime= $this->input->post('booking_time');
	  $splitTimeStamp = explode(" ",$date);
	  $date = $udate;
	  $time = $utime;
	  $save_in_appointment['event_id'] 	= $event_id ;
	  $save_in_appointment['appointment_date'] 	= $newdate ;
	  $save_in_appointment['appointment_time'] 	= $start_time ;
	  $save_in_appointment['patient_id'] = $this->input->post('patient_id');
	  $save_in_appointment['is_view'] = '0';
	  $save_in_appointment['is_paid'] = '0';
	  $save_in_appointment['is_closed'] = '0';

	$register_in_book = $this->patient_model->book_appointment_save($save_in_appointment,'appointments');  

	  // Save in patient health issue
	$save_in_patient_health['patient_id']  	=  $this->input->post('patient_id');
	$save_in_patient_health['dependent_id']  	=  $this->input->post('dependent_id');
	//$save_in_patient_health['patient_id']  	=  $this->input->post('patient_id');
	$save_in_patient_health['request_id']  	= $p_key;
	$save_in_patient_health['past_health_concern'] = $this->input->post('past_health_concern');
	$save_in_patient_health['current_health_concern'] = $this->input->post('current_health_concern');


	$save_in_patient_health['height_ft'] = $this->input->post('height_ft');
	$save_in_patient_health['height_in'] = $this->input->post('height_in');
	$save_in_patient_health['bp_low'] = $this->input->post('bp_low');
	$save_in_patient_health['bp_high'] = $this->input->post('bp_high');
	$save_in_patient_health['temprature'] = $this->input->post('temprature');
	$save_in_patient_health['weight'] = $this->input->post('weight');
	$save_in_patient_health['bmi'] = $this->input->post('bmi');
	$save_in_patient_health['pulse'] = $this->input->post('pulse');
	$save_in_patient_health['o2sat'] = $this->input->post('o2sat');


	


if($device == 'ios')
{
	//upload Lab Result 	
	// if($_FILES['lab_result']['name'] !='' && isset($_FILES['lab_result']['name']))
	 if(!empty($_FILES['lab_result']['name']))
		{ 
			$file_name_uploadlab_result = $_FILES["lab_result"]["name"];

			if(@is_uploaded_file($_FILES["lab_result"]["tmp_name"]))
			 {
			   move_uploaded_file($_FILES['lab_result']['tmp_name'],"./assets/patient/lab_result/".$file_name_uploadlab_result);
		     }	

			$save_in_patient_health['lab_result_doc']  = $file_name_uploadlab_result;
	    }
}
else
{
	if(!empty($this->input->post("lab_result")))
	{
		$image1 = base64_decode($this->input->post("lab_result"));
		$image_name1 = md5(uniqid(rand(), true));
		$filename1 = $image_name1 . '.' . 'png';

		$path1 = "./assets/patient/lab_result/".$filename1;

		//image uploading folder path
		file_put_contents($path1, $image1);

		$save_in_patient_health['lab_result_doc'] =  $filename1;
	}
	else
	{
		$save_in_patient_health['lab_result_doc'] = '';
	}
}




   



	// Upload Lab Pic    

	   //if($_FILES['lab_picture']['name'] !='' && isset($_FILES['lab_picture']['name']))
	 //   if(!empty($_FILES['lab_picture']['name']))
		// { 
		// 	$file_name_uploadlab_image = $_FILES["lab_picture"]["name"];
		// 	if(@is_uploaded_file($_FILES["lab_picture"]["tmp_name"]))
		// 	 {
		// 	   move_uploaded_file($_FILES['lab_picture']['tmp_name'],"./assets/patient/lab_image/".$file_name_uploadlab_image);
		//      }	

		// 	$save_in_patient_health['lab_pic']  = $file_name_uploadlab_image;
	 //    }

if($device == 'ios')
{

	// Upload Lab Pic    

	 //  if($_FILES['lab_picture']['name'] !='' && isset($_FILES['lab_picture']['name']))
	   if(!empty($_FILES['lab_picture']['name']))
		{ 
			$file_name_uploadlab_image = $_FILES["lab_picture"]["name"];
			if(@is_uploaded_file($_FILES["lab_picture"]["tmp_name"]))
			 {
			   move_uploaded_file($_FILES['lab_picture']['tmp_name'],"./assets/patient/lab_image/".$file_name_uploadlab_image);
		     }	

			$save_in_patient_health['lab_pic']  = $file_name_uploadlab_image;
	    }
}
else
{
	if(!empty($this->input->post("lab_picture")))
	{
	    $image2 = base64_decode($this->input->post("lab_picture"));
		$image_name2 = md5(uniqid(rand(), true));
		$filename2 = $image_name2 . '.' . 'png';

		$path2 = "./assets/patient/lab_image/".$filename2;

		//image uploading folder path
		file_put_contents($path2, $image2);

		$save_in_patient_health['lab_pic'] =  $filename2;

	}
	else
	{
		$save_in_patient_health['lab_pic'] =  '';
	}
}




	   // Upload Other Pic    

	   //if($_FILES['lab_document']['name'] !='' && isset($_FILES['lab_document']['name']))
	

if($device == 'ios')
{
   if(!empty($_FILES['lab_document']['name']))
		{ 
			$file_name_uploadlab_doc = $_FILES["lab_document"]["name"];
			if(@is_uploaded_file($_FILES["lab_document"]["tmp_name"]))
			 {
			   move_uploaded_file($_FILES['lab_document']['tmp_name'],"./assets/patient/other_documents/".$file_name_uploadlab_doc);
		     }	

			$save_in_patient_health['other_doc']  = $file_name_uploadlab_doc;

			$save_in_patient_health['adddate']  = date("Y-m-d H:i:s");
	    }

}
else
{
	if(!empty($this->input->post("lab_document")))
	{

		$image3 = base64_decode($this->input->post("lab_document"));
		$image_name3 = md5(uniqid(rand(), true));
		$filename3 = $image_name3 . '.' . 'png';

		$path3 = "./assets/patient/other_documents/".$filename3;

		//image uploading folder path
		file_put_contents($path3, $image3);

		$save_in_patient_health['other_doc'] =  $filename3;
	}
	else
	{
		$save_in_patient_health['other_doc'] =  '';
	}

}





$register_in_patient_health = $this->patient_model->book_appointment_save($save_in_patient_health,'patient_health_issue');



	echo json_encode(array("status"=>'success', "msg"=>'Your request send successfully'));	

	 // For send SMS
    $doctor_id_for_sms = $this->input->post('doctor_id');
    $patient_id_for_sms = $patient_id;
    $doctor_data = get_user_info($doctor_id_for_sms,2);

    $patient_data = get_petient_info($patient_id_for_sms);
    $patient_phone = $patient_data[0]->mobile;
    
    //$phone = $this->input->post('phone');
    $email = $this->input->post('email');
    $name = $this->input->post('name');

    // $userID = "u-gtmyz6s34hajd2o5hrtdq2y"; 
    // $token = "t-sjlwte7j7ppk7wbuff7x5sq";
    // $secret = "xep2tb6a6jru6rp5vkkbtfmqb3bdr2hmbv2cfoy";

    $token = "1c906f4ed674a35575e4268950d0c666890b720829a6f55b";
    $secret = "971cdc50cca48313169617530ffe37695cd7992300b33267";
    $application_id = "f34b2225-1279-40fa-9286-94a033729d48";


    // get the incoming SMS details
    //$your_bandwidth_phone_num = "+15554443333";  // you must use a Bandwidth number you have added to your account
    $your_bandwidth_phone_num = "5183090045";  // you must use a Bandwidth number you have added to your account
    //$to_phone_num = "7654094813"; // this is the phone number you want to send an SMS to
    $to_phone_num =  $doctor_data->mobile; // this is the phone number you want to send an SMS to
    $smsMsgToSend = "You have a Patient visit request in your American Ecare dashboard"; // max length is 
 
    // Set the URL for the messages resource */
    $restMessagesURI = "https://messaging.bandwidth.com/api/v2/users/5005122/messages"; // Set the API URI
    // Create JSON request to with "from", "to" and "text" to send an SMS 
  	 $data = array("from" => $your_bandwidth_phone_num, 
                    "to" =>   $to_phone_num,
                    "text" => $smsMsgToSend,
                    "applicationId" => $application_id,
                    "tag" => "test message"
                ); 
    // Pack the data into a JSON-friendly array
    $data_string = json_encode($data); 
    // this is PHP code to create an HTTPS POST request
    $ch=curl_init($restMessagesURI);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($ch, CURLOPT_HEADER, TRUE);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'Content-Length: ' . strlen($data_string)
        )); 
    curl_setopt($ch, CURLOPT_FAILONERROR, TRUE);    // Stop if an error occurred
    // Security: We need to authenticate to BASIC here
    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_USERPWD, $token . ":" . $secret);
    // Body: let's POST the body with the JSON array we created
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
    // Run the HTTP POST request to send a SMS 
    $server = curl_exec($ch);

	// Send To Patient

    $token_new = "1c906f4ed674a35575e4268950d0c666890b720829a6f55b";
    $secret_new = "971cdc50cca48313169617530ffe37695cd7992300b33267";
    $application_id = "f34b2225-1279-40fa-9286-94a033729d48";


    // get the incoming SMS details
    //$your_bandwidth_phone_num = "+15554443333";  // you must use a Bandwidth number you have added to your account
    $your_bandwidth_phone_num_new = "5183090045";  // you must use a Bandwidth number you have added to your account
    //$to_phone_num = "7654094813"; // this is the phone number you want to send an SMS to
    $to_phone_num_new =  $patient_phone; // this is the phone number you want to send an SMS to
    $smsMsgToSend_new = "Thank you for requesting an American Ecare Doctor visit. Our Doctor will review your portal and send you shortly a link to start your video visit"; // max length is 
 
    // Set the URL for the messages resource */
    $restMessagesURI_new = "https://messaging.bandwidth.com/api/v2/users/5005122/messages"; // Set the API URI
    // Create JSON request to with "from", "to" and "text" to send an SMS 
	  $data_new = array("from" => $your_bandwidth_phone_num_new, 
                    "to" =>   $to_phone_num_new,
                    "text" => $smsMsgToSend_new,
                    "applicationId" => $application_id,
                    "tag" => "test message"
                ); 
    // Pack the data into a JSON-friendly array
    $data_string_new = json_encode($data_new); 
    // this is PHP code to create an HTTPS POST request
    $ch_new=curl_init($restMessagesURI_new);
    curl_setopt($ch_new, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($ch_new, CURLOPT_HEADER, TRUE);
    curl_setopt($ch_new, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch_new, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'Content-Length: ' . strlen($data_string_new)
        )); 
    curl_setopt($ch_new, CURLOPT_FAILONERROR, TRUE);    // Stop if an error occurred
    // Security: We need to authenticate to BASIC here
    curl_setopt($ch_new, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch_new, CURLOPT_USERPWD, $token_new . ":" . $secret_new);
    // Body: let's POST the body with the JSON array we created
    curl_setopt($ch_new, CURLOPT_POSTFIELDS, $data_string_new);
    // Run the HTTP POST request to send a SMS 
    $server_new = curl_exec($ch_new);


	}

	else
	{
		echo json_encode(array("status"=>'fail', "msg"=>'Your request failed'));		
	}


}

	
	

}



// ******** API FOR PATIENT Main REGISTER ***********//


function patient_main_register()
{
	if($this->input->server('REQUEST_METHOD') === 'POST')
      {
      	$save['patient_application_no'] = 'Pat'.rand(100000,999999);
      	$save['email'] = $this->input->post('email');
      	$save['password'] = md5($this->input->post('password'));
      	$save['decrypt_password'] = $this->input->post('password');
      	$save['dob'] = $this->input->post('dob');
      	$save['zone'] = $this->input->post('zone');
      	$save['city'] = '24210';
      	$save['state'] = $this->input->post('state');
      	$save['location_id'] = "Address".rand(10000,99999);
      	$save['status'] = '1';
      	$save['open_page'] = '0';
		$save['adddate'] = date('Y-m-d');
		$save['addtime'] = date('H:i:s');

		// $num_rows_for_phone = $this->patient_model->chk_rows('patient_basic','mobile',$save['mobile']);
		$num_rows_for_email = $this->patient_model->chk_rows('patient_basic','email',$save['email']);

	if($num_rows_for_email > 0)
		{
			echo json_encode(array("status"=>'fail', "msg"=>'Email is already exist'));	
		}
		// elseif($num_rows_for_phone >0)
		// {
		//   	echo json_encode(array("status"=>'fail', "msg"=>'Phone is already exist'));
		// }


		else
		{
			$p_key = $this->patient_model->registered_patient($save,'patient_basic');

			if($p_key)
			 {

			 	$this->db->where('id',$p_key);
				$patient_data = $this->db->get('patient_basic')->row();		

				// if(empty($patient_data->first_name))
				// {
				// 	//$open_page = 1;	
				// 	$data_for_update = array(
				// 		"open_page" => 1
				// 	);

				// 	$this->db->where("id",$p_key);
				// 	$this->db->update("patient_basic",$data_for_update);
				// }
				


			 	echo json_encode(array("status"=>'success', "msg"=>"Registration Successfull",  "data"=>$patient_data));
			 }
			 else
			 {
			 	echo json_encode(array("status"=>'fail', "msg"=>"Registration failed"));
			 }
		}	
    }
}


function patient_full_register()
{
	if($this->input->server('REQUEST_METHOD') === 'POST')
      {
      	$patient_id = $this->input->post('patient_id');

		$save['first_name'] = $this->input->post('first_name');
		$save['middle_name'] = $this->input->post('middle_name');
        $save['last_name'] =$this->input->post('last_name');
		$save['address'] = $this->input->post('address');
		$save['mobile'] = $this->input->post('mobile');
		//$save['zone'] = $this->input->post('zone');
		$save['city'] = $this->input->post('city');
		$save['pincode'] = $this->input->post('pincode');
		$save_in_demography['demographic_gender'] = $this->input->post('gender');
		$save_in_demography['patient_id'] = $patient_id;

	// Update in patient Basic table

		$this->db->where("id",$patient_id);
		$n = $this->db->update("patient_basic",$save);

	// Save in patient demographic
	 
	$save_in_demography_table = $this->patient_model->registered_patient($save_in_demography,'patient_demographic');




	if($n)
	{
		//$open_page = 1;	
		$data_for_update = array(
			"open_page" => '1'
		);

		$this->db->where("id",$patient_id);
		$this->db->update("patient_basic",$data_for_update);
        $this->db->affected_rows();

   $this->db->where('id',$patient_id);
	$patient_data = $this->db->get('patient_basic')->row();		
	

		//echo $this->db->last_query();die;

	 echo json_encode(array("status"=>'success', "msg"=>"Update success", "data"=>$patient_data));
	}
	else
	{
		echo json_encode(array("status"=>'fail', "msg"=>"Update failed"));
	}

   }
}




// ******** API FOR PATIENT REGISTER ***********//

	function patient_register()
	{	
		if($this->input->server('REQUEST_METHOD') === 'POST')
      		{	
				$save['patient_application_no'] = 'Pat'.rand(100000,999999);
				$save['first_name'] = $this->input->post('first_name');
				$save['middle_name'] = $this->input->post('middle_name');
	            $save['last_name'] =$this->input->post('last_name');
				$save['email'] = $this->input->post('email');
				$save['password'] = md5($this->input->post('password'));
				$save['decrypt_password'] = $this->input->post('password');
				$save['address'] = $this->input->post('address');
				$save['mobile'] = $this->input->post('mobile');
				$save['zone'] = $this->input->post('zone');
				$save['country'] = $this->input->post('country');
				$save['state'] = $this->input->post('state');
				$save['city'] = $this->input->post('city');
				$save['pincode'] = $this->input->post('pincode');
				$save['dob'] = $this->input->post('dob');
				$save['location_id'] = "Address".rand(10000,99999);
				$save['status'] = '1';
				$save['adddate'] = date('Y-m-d');
				$save['addtime'] = date('H:i:s');

				$save_in_demography['demographic_gender'] = $this->input->post('gender');


				$num_rows_for_phone = $this->patient_model->chk_rows('patient_basic','mobile',$save['mobile']);
				$num_rows_for_email = $this->patient_model->chk_rows('patient_basic','email',$save['email']);

			if($num_rows_for_email > 0)
				{
					echo json_encode(array("status"=>'fail', "msg"=>'Email is already exist'));	
				}
				elseif($num_rows_for_phone >0)
				{
				  	echo json_encode(array("status"=>'fail', "msg"=>'Phone is already exist'));
				}


			else
				{
				// Save Basic Registration 

				$p_key = $this->patient_model->registered_patient($save,'patient_basic');

				if($p_key)
				{
			      	
					$save_in_demography_table = $this->patient_model->registered_patient($save_in_demography,'patient_demographic');


				$this->db->where('id',$p_key);
				$patient_data = $this->db->get('patient_basic')->row();			

			//Sending Mail

				  $config = Array(
				  'protocol' => 'sendmail',
				  'smtp_host' => 'smtp.office365.com',
				  'smtp_port' => 465,
				  'smtp_user' => 'info@americanecare.com', // change it to yours
				  'smtp_pass' => 'Brooke2019%', // change it to yours
				  'mailtype' => 'html',
				  'charset' => 'iso-8859-1',
				  'wordwrap' => TRUE
				);


				$message = '<div class="sub-grid">
				
				<p>Dear '.$save['first_name'].'<br>
				Thank you for joining our healthcare network. Our medical board certified doctors and licensed by your State are ready to provide the best care with affordable pricing.
				</p>

					<p>
					  <a href="'.base_url().'front/home/patient_login">Start a doctor visit now</a>
					</p> 

				   <p>
				   <a href="'.base_url().'front/home/patient_login">Schedule a visit</a>
				   </p>

				   <p>
  					 <a href="'.base_url().'front/home/patient_login">
				   Setup your profile
				 	 </a> 
				   </p>

				    <p>
				     <a href="'.base_url().'front/home/patient_login">
				   Video as Demo
				   </a> 
				   </p>

				   <p>
				  <a href="'.base_url().'front/home/patient_login">
				   Download iOS App
				  </a> 
				   </p>

				   <p>
				     <a href="'.base_url().'front/home/patient_login">
				  Download Android App
				  </a> 
				   </p>

				   <p>
 					<a href="#">
				
				   	Download Windows App
					 </a>  
				   </p>
				  </div>';


			      $this->load->library('email', $config);
			      $this->email->set_newline("\r\n");
			      $this->email->from('info@americanecare.com'); // change it to yours
			      $this->email->to($save['email']);// change it to yours
			      $this->email->subject('Welcome to AMERICAN ECARE ');
			      $this->email->message($message);
				  $this->email->send();

				echo json_encode(array("status"=>'success', "msg"=>"Registration Successfull",  "data"=>$patient_data));
  	
				}

				else
				{
				 echo json_encode(array("status"=>'fail', "msg"=>'Insert Error'));
				}
			}

		}
	}



// ******** API FOR PATIENT LOGIN ***********//


function patient_login()
{
	 if($this->input->server('REQUEST_METHOD') === 'POST')
	  {	
	  	$username = $this->input->post('username');
	  	$password = md5($this->input->post('password'));

	  	 $que=$this->db->query("select * from patient_basic where email='".$username."' and password='".$password."'");
		 $row = $que->num_rows();
		 $fetch_detail = $que->row();

 //$without_null = change_null($fetch_detail);


		

 if($row>0)
	{
		if(is_null($fetch_detail->social_security_number))
		 {
		 	$social_security_number	= '';
		 }
		 else
		 {
		 	$social_security_number = $fetch_detail->social_security_number;

		 }

		  if(is_null($fetch_detail->first_name))
		 {
		 	$first_name	= '';
		 }
		 else
		 {
		 	$first_name	= $fetch_detail->first_name;
		 }

		 if(is_null($fetch_detail->middle_name))
		 {
		 	$middle_name	= '';
		 }
		 else
		 {
			$middle_name	= $fetch_detail->middle_name;
		 }


		 if(is_null($fetch_detail->last_name))
		 {
		 	$last_name	= '';
		 }
		 else
		 {
		 	$last_name	= $fetch_detail->last_name;
		 }

		 if(is_null($fetch_detail->dob))
		 {
		 	$dob	= '';
		 }
		 else
		 {
		 	$dob	= $fetch_detail->dob;
		 }

		  if(is_null($fetch_detail->mobile))
		 {
		 	$mobile	= '';
		 }
		 else
		 {
		 	$mobile	= $fetch_detail->mobile;
		 }

 		 if(is_null($fetch_detail->zone))
		 {
		 	$zone	= '';
		 }
		 else
		 {
		 	$zone_name = get_zone_by_id($fetch_detail->zone)->zone;
		 	$zone	= $fetch_detail->zone;
		 }


		 if(is_null($fetch_detail->state))
		 {
		 	$state	= '';
		 }
		 else
		 {
		 	//$zone_name = get_zone_by_id($fetch_detail->zone)->zone;
		 	$state	= $fetch_detail->state;
		 	$state_name = get_state($state)[0]->name;


		 }

		  if(is_null($fetch_detail->city))
		 {
		 	$city	= '';
		 }
		 else
		 {
		 	//$zone_name = get_zone_by_id($fetch_detail->city)->city;
		 	$city	= $fetch_detail->city;
		 	$city_name = get_city($city)[0]->name;
		 }


		 if(is_null($fetch_detail->address))
		 {
		 	$address	= '';
		 }
		 else
		 {
		 	//$zone_name = get_zone_by_id($fetch_detail->city)->city;
		 	$address	= $fetch_detail->address;
		 }


		 if(is_null($fetch_detail->email))
		 {
		 	$email	= '';
		 }
		 else
		 {
		 	$email	= $fetch_detail->email;
		 }

		  if(is_null($fetch_detail->location_id))
		 {
		 	$location_id	= '';
		 }
		 else
		 {
		 	$location_id	= $fetch_detail->location_id;
		 }

		   if(is_null($fetch_detail->pincode))
		 {
		 	$pincode	= '';
		 }
		 else
		 {
		 	$pincode	= $fetch_detail->pincode;
		 }

		   if(is_null($fetch_detail->status))
		 {
		 	$status	= '';
		 }
		 else
		 {
		 	$status	= $fetch_detail->status;
		 }

		 if(is_null($fetch_detail->country))
		 {
		 	$country	= '';
		 }
		 else
		 {
		 	$country	= $fetch_detail->country;
		 }

		  if(is_null($fetch_detail->open_page))
		 {
		 	$open_page	= '';
		 }
		 else
		 {
		 	$open_page	= $fetch_detail->open_page;
		 }



		$without_null =array(
			"id"=> $fetch_detail->id,
			"patient_application_no"=> $fetch_detail->patient_application_no,
			"social_security_number"=> $social_security_number,
			"first_name"=> $first_name,
			"middle_name"=> $middle_name,
			"last_name"=> $last_name,
			"dob"=> $dob,
			"email"=> $email,
			"location_id"=> $location_id,
			"zone"=> $zone,
			"country"=> $country,
			"state"=> $state,
			"city"=> $city,
			"state_name"=> $state_name,
			"city_name"=> $city_name,
			"pincode"=> $pincode,
			"address"=> $address,
			"mobile"=> $mobile,
			"open_page"=> $open_page,
			"status"=> $status,

		);


		if(!empty($fetch_detail->first_name) && $fetch_detail->open_page == 0)
			{
	
				//$open_page = 1;						

				$data_for_update_in_patient = array(
				   "open_page"=> '1'
				);

			  $this->db->where('id', $fetch_detail->id);
			  $this->db->update('patient_basic',$data_for_update_in_patient);	

			}
			


			  //echo json_encode(array("status"=>'success', "msg"=>'Login Success', "data"=>$fetch_detail));
				echo json_encode(array("status"=>'success', "msg"=>'Login Success', "data"=>$without_null));
			}

			else
			{
			  echo json_encode(array("status"=>'fail', "msg"=>'Login Failed', "data"=>[]));
			}
	  }

}


function get_visit_detail()
{
	$visit_id = $this->input->post('visit_id');
	$get_patient_from_medical_request = $this->doctor->patient_booking_get_from($visit_id);
		
}



function version()
{
	$version = $_POST['version'];

	$que=$this->db->query("select * from app_version where version='".$version."'");
	$row = $que->num_rows();
	if($row > 0)
	{	
	 echo json_encode(array("status"=>'fail', "msg"=>'Not Update'));
	}
	else
	{
		echo json_encode(array("status"=>'success', "msg"=>'Please update new version'));
	}
}

function test_new_email()
{

	$email_body = "Hello This is test";
	$to = 'anmol.dmi@mail.com';
	$subject = "Order#order_code";
	$message = $email_body;
	$eMail = 'info@americanecare.com';

	$headers  = 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
	$headers .= 'From: <'.$eMail.'>';

	if(mail($to, $subject, $message, $headers))
	{
		echo "send";
	}
	else
	{
		echo "fail";
	}



 // $config = Array(
 //    'protocol' => 'smtp',
 //    'smtp_host' => 'smtp.office365.com',
 //    'smtp_port' => 465,
 //    'smtp_user' => 'support@americanecare.com', // change it to yours
 //    'smtp_pass' => 'Brooke2019%', // change it to yours
 //    'mailtype' => 'html',
 //    'charset' => 'iso-8859-1',
 //    'wordwrap' => TRUE
 //    );

    
 
 //   // $type='doctors';
 //   $message="Dear  Thank you for requesting American Ecare healthcare services. Please click on the link to start the video consultation <br/>";
  
 //   // $message.="<a href=".$full_link.">".$full_link."</a>";

 //    $this->load->library('email', $config);
 //    $this->email->initialize($config);
 //    $this->email->set_newline("\r\n");
 //    $this->email->from('support@americanecare.com'); // change it to yours
 //    $this->email->to('anmol.dmi@gmail.com');// change it to yours
 //    $this->email->subject('Link for video setup');
 //    $this->email->message($message);
 //    if($this->email->send())
 //    {
 //    	echo "mail send";
 //    }
 //    else
 //    {
 //    	//echo "mail not send";
 //    	echo $this->email->print_debugger();
 //    }

}


function sms_test()
{
	$token_new = "1c906f4ed674a35575e4268950d0c666890b720829a6f55b";
    $secret_new = "971cdc50cca48313169617530ffe37695cd7992300b33267";
    $application_id = "f34b2225-1279-40fa-9286-94a033729d48";


    // get the incoming SMS details
    //$your_bandwidth_phone_num = "+15554443333";  // you must use a Bandwidth number you have added to your account
    $your_bandwidth_phone_num_new = "5183090045";  // you must use a Bandwidth number you have added to your account
    //$to_phone_num = "7654094813"; // this is the phone number you want to send an SMS to
    $to_phone_num_new =  "7654098375"; // this is the phone number you want to send an SMS to
    $smsMsgToSend_new = "Hello Test sms"; // max length is 
 
    // Set the URL for the messages resource */
    $restMessagesURI_new = "https://messaging.bandwidth.com/api/v2/users/5005122/messages"; // Set the API URI
    // Create JSON request to with "from", "to" and "text" to send an SMS 
	  $data_new = array("from" => $your_bandwidth_phone_num_new, 
                    "to" =>   $to_phone_num_new,
                    "text" => $smsMsgToSend_new,
                    "applicationId" => $application_id,
                    "tag" => "test message"
                ); 
    // Pack the data into a JSON-friendly array
    $data_string_new = json_encode($data_new); 
    // this is PHP code to create an HTTPS POST request
    $ch_new=curl_init($restMessagesURI_new);
    curl_setopt($ch_new, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($ch_new, CURLOPT_HEADER, TRUE);
    curl_setopt($ch_new, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch_new, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'Content-Length: ' . strlen($data_string_new)
        )); 
    curl_setopt($ch_new, CURLOPT_FAILONERROR, TRUE);    // Stop if an error occurred
    // Security: We need to authenticate to BASIC here
    curl_setopt($ch_new, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch_new, CURLOPT_USERPWD, $token_new . ":" . $secret_new);
    // Body: let's POST the body with the JSON array we created
    curl_setopt($ch_new, CURLOPT_POSTFIELDS, $data_string_new);
    // Run the HTTP POST request to send a SMS 
    $server_new = curl_exec($ch_new);

	print_r($server_new);

}

function get_dependent_by_relation()
    {
        $b = array();
        $patient_id = $this->input->post('patient_id');
        $dependent_relationship = $this->input->post('dependent_relationship');
        
        $this->db->where('patient_id',$patient_id);
        $this->db->where('dependent_relationship',$dependent_relationship);
     	$patient_dependents = $this->db->get(' patient_dependent')->result();
     	
         if(!empty($patient_dependent))	
        	{
        		foreach ($patient_dependent as $row)
        		 {
        			$a['patient_id'] = $row->patient_id;
        			$a['id'] = $row->id;
        			$a['dependent_first_name'] = $row->dependent_first_name;
        		    array_push($b,$a);
        		 }
        
        		 echo json_encode(array("status"=>'success', "data"=>$b));
        	}
   }
   
   
    function get_visit_name()
    {
       $visit_id = $this->input->post('visit_id'); 
       $this->db->where('id',$visit_id);
       $visit_detail = $this->db->get('visit_type')->row();
       
       if(isset($visit_detail) && !empty($visit_detail))
       {
           $a['visit_type_name']= isset($visit_detail->visit_type_name) ? $visit_detail->visit_type_name : '';
           $a['visit_type_price']= isset($visit_detail->visit_type_price) ? $visit_detail->visit_type_price : 0;
           echo json_encode(array("status"=>'success',  "data"=>$a));
       }
       else
       {
           $a['visit_type_name']= '';
           $a['visit_type_price']= 0;
           echo json_encode(array("status"=>'false',  "data"=>$a));
       }
       
       
    }


}
