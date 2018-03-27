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
    }
}

module.exports = model;