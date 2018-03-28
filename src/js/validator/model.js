var model = {
    password: {
        required: true,
        length: [3, 10],
        msg: {required: '必填', length: '密码长度在3-10'}
    },
    repassword: {
        required: true,
        length: [3, 10],
        check: function (val) {
            return val === this.password
        },
        msg: {required: '必填', length: '密码长度在3-10', check: '两次密码不一致'}
    },
    mobile:{
        required: true,
        check: function (val) {
           return val.length == 11 && /^1[3|4|5|7|8|][0-9]{9}$/.test(val)
        },
        msg: {required: '必填', check: '手机号格式不正确'}
    },
    email:{
        required: true,
        check: function (val) {
           return /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/.test(val)
        },
        msg: {required: '必填', check: '邮箱格式不正确'}
    },
    name:{
        required: true,
        check: function (val) {
           return  /^[a-zA-Z0-8_]{6,15}$/.test(val) 
        },
        msg: {required: '必填', check: '用户名只包含大小写字母、数字和下划线,长度在6-15之间'}
    }
}

module.exports = model;