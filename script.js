const form = document.getElementById('registerForm');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');

// 显示错误信息
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// 显示成功状态
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// 验证邮箱格式
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
    return true;
  } else {
    showError(input, '邮箱格式不正确');
    return false;
  }
}

// 检查必填字段
function checkRequired(inputArr) {
  let isRequired = true;
  inputArr.forEach(function(input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} 不能为空`);
      isRequired = false;
    } else {
      showSuccess(input);
    }
  });
  return isRequired;
}

// 检查输入长度
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} 长度不能少于 ${min} 个字符`);
    return false;
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} 长度不能超过 ${max} 个字符`);
    return false;
  } else {
    showSuccess(input);
    return true;
  }
}

// 检查密码匹配
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, '两次密码输入不匹配');
    return false;
  } else {
    return true;
  }
}

// 获取字段名
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// 表单提交事件
form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const isRequiredValid = checkRequired([username, email, password, confirmPassword]);
  const isUsernameValid = checkLength(username, 3, 15);
  const isEmailValid = checkEmail(email);
  const isPasswordValid = checkLength(password, 6, 25);
  const isPasswordMatch = checkPasswordsMatch(password, confirmPassword);
  
  if (isRequiredValid && isUsernameValid && isEmailValid && isPasswordValid && isPasswordMatch) {
    alert('注册成功！');
    form.reset();
    document.querySelectorAll('.form-control').forEach(control => {
      control.className = 'form-control';
    });
  }
});