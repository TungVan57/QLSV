const tableBodyElement = document.querySelector('#tbodySinhVien');
let currentCountSV = localStorage.getItem('msvCount') ? localStorage.getItem('msvCount') : 1;

const listSV = localStorage.getItem('listSV') ? JSON.parse(localStorage.getItem('listSV')) : [
    {
        maSv: '',
        tenSv: 'abc',
        email: 'email@gmail.email',
        mauKhau: '123123',
        ngaySinh: '30/09/2000',
        khoaHoc: '1',
        diemToan: 9,
        diemLy: 5,
        diemHoa: 3
    }
    
];

    const tenSvElement = document.querySelector('#txtTenSV')
    const emailSVElement = document.querySelector('#txtEmail')
    const passSVElement=document.querySelector('#txtPass')
    const dobSVElement = document.querySelector('#txtNgaySinh');
    const courseSVElement = document.querySelector('#khSV')
    const diemToanElement = document.querySelector('#txtDiemToan')
    const diemLyElement =document.querySelector('#txtDiemLy');
    const diemHoaElement = document.querySelector('#txtDiemHoa');

    let editId='';
 function buildSVTemplate(svObj){
    const templateSv = document.querySelector('#templateSinhVien');
    const fragmentSv = templateSv.content.cloneNode(true);
    const svElement = fragmentSv.querySelector('.sinhVienRow');

    const msvElement = svElement.querySelector('.msv');
    msvElement.innerText = svObj.maSv;

    const tsvElement = svElement.querySelector('.tsv');
    tsvElement.innerText = svObj.tenSv;

    const emailElement = svElement.querySelector('.email');
    emailElement.innerText = svObj.email;
    const dobElement = svElement.querySelector('.dob');
    dobElement.innerText = svObj.ngaySinh;
    const courseElement = svElement.querySelector('.course');
    courseElement.innerText = svObj.khoaHoc === '1' ?  'KH01' : 'KH02';
    const dtbElement = svElement.querySelector('.dtb');
    const diemTb = (Number(svObj.diemHoa) + Number(svObj.diemLy)+ Number(svObj.diemHoa))/3;
     dtbElement.innerText= diemTb.toFixed(2);
     
     const removeBtn = svElement.querySelector('.removeBtn');
     removeBtn.addEventListener('click',function() {
        tableBodyElement.removeChild(svElement);

        const svIndex= listSV.findIndex((sv)=>{
            return sv.maSv === svObj.maSv
        })

        if(svIndex !== -1){
            listSV.splice(svIndex,1);
            localStorage.setItem('listSV',JSON.stringify(listSV));
        }
     })

     if(editId){
        
     }

     const editBtn =svElement.querySelector('.editBtn');
     editBtn.addEventListener('click', ()=>{
        tenSvElement.value=svObj.tenSv;
        emailSVElement.value=svObj.email;
        dobSVElement.value=svObj.ngaySinh;
        courseSVElement.value=svObj.khoaHoc;
        diemToanElement.value=svObj.diemToan;
        diemLyElement.value=svObj.diemLy;
        diemHoaElement.value=svObj.diemHoa;
        editId=svObj.maSv;
        addSVbtn.innerText='Edit Sinh Vien';
     })

     return svElement;
 }
for (const sinhVien of listSV) {
    const svElement= buildSVTemplate(sinhVien);
    tableBodyElement.appendChild(svElement);
}

const addSVbtn = document.querySelector('#addSVbtn');

addSVbtn.addEventListener('click',handleAddSV)

const INPUT_TYPE ={
    NUMBER:'number',
    TEXT:'text',
    SELECT:'select'
}

function handleAddSV(event){    
    event.preventDefault();
    let isValid =true;
     
    const arrayInputs=[tenSvElement,emailSVElement,passSVElement,dobSVElement,courseSVElement,diemToanElement,diemLyElement,diemHoaElement]

    for (const input of arrayInputs) {
        const inputType =input.getAttribute('data-inputType');
        const inputName = input.getAttribute('data-name');

        if(inputType===INPUT_TYPE.TEXT){
            if(!input.value || input.value.length<4){
                input.nextElementSibling.style.display='block';
                input.nextElementSibling.innerText=`${inputName} is not valid`;
                isValid =false;
            }
        }
        
    }
    if (!isValid) return

    const newSV = {
        tenSv: tenSvElement.value,
        maSv: 'MSV-' + currentCountSV,
        email: emailSVElement.value,
        ngaySinh: dobSVElement.value,
        password: passSVElement.value,
        khoaHoc: courseSVElement.value,
        diemToan: Number(diemToanElement.value),
        diemLy: Number(diemLyElement.value),
        diemHoa: Number(diemHoaElement.value),
    }
    listSV.push(newSV);
    localStorage.setItem('listSV',JSON.stringify(listSV) )
    //them vào vị trí cần thiết 
    const newSvElement = buildSVTemplate(newSV);
    tableBodyElement.appendChild(newSvElement);
    //reset form
    const formSV = document.querySelector('#addSVForm')
    formSV.reset();
    currentCountSV++;
    localStorage.setItem('msvCount',currentCountSV)
    
}
