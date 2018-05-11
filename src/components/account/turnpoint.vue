<template>
  <div class="turnpoint">
  <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="194">
    <FormItem label="转点金额" prop="passwd">
      <InputNumber @on-change="NumberToChinese(formCustom.passwd)" type="text" :max="1000" :min="1"  v-model="formCustom.passwd" style="width: 120px"></InputNumber><span style="margin-left: 10px;">{{text}}{{this.douel}}</span>
    </FormItem>
    <FormItem label="下级账号" prop="passwdCheck" >
      <Input type="text" v-model="formCustom.passwdCheck" style="width: 300px"></Input>
    </FormItem>
    <FormItem label="资金密码" prop="mm" >
      <Input type="password" v-model="formCustom.mm"  style="width: 300px"></Input>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit('formCustom')">确认</Button>
      <Button type="ghost" @click="handleReset('formCustom')" style="margin-left: 8px">取消</Button>
    </FormItem>
  </Form>
  </div>
</template>
<script>
  import { mapActions,mapState } from  'vuex';
  export default {
    data () {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('转点金额不能为空!'));
        } else {
//          if (this.formCustom.passwdCheck !== '') {
//            // 对第二个密码框单独验证
//            this.$refs.formCustom.validateField('请输入整点数的转点金额!');
//          }
          callback();
        }
      };
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('下级账号不能为空!'));
        } else {
          callback();
        }
      };
      const validateAge = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('资金密码不能为空!'));
        } else {
          callback();
        }
      };
      return {
        formCustom: {
          passwd:0,
          passwdCheck: '',
          mm: ''
        },
        text: '',
        douel:'元整',
        unit: new Array("仟", "佰", "拾", "", "仟", "佰", "拾", "", "角", "分"),
        ruleCustom: {
          passwd: [
            { validator: validatePass, trigger: 'blur', required: true }
          ],
          passwdCheck: [
            { validator: validatePassCheck, trigger: 'blur', required: true }
          ],
          mm: [
            { validator: validateAge, trigger: 'blur', required: true }
          ]
        }
      }
    },
//    created(){
//      this.handleReset('formCustom')
//    },
    computed:{
      ...mapState('account',['turnPointList'])
    },
    methods: {
      ...mapActions('account',['turnPoint']),
      toDx(n) {
        switch (n) {
          case "0":
            return "零";
          case "1":
            return "壹";
          case "2":
            return "贰";
          case "3":
            return "叁";
          case "4":
            return "肆";
          case "5":
            return "伍";
          case "6":
            return "陆";
          case "7":
            return "柒";
          case "8":
            return "捌";
          case "9":
            return "玖";
        }
      },
      // 转换算法主函数
      NumberToChinese(m){
        this.douel = "";
        m *= 100;
        m += "";
        var length = m.length;

        var result = "";
        for (var i = 0; i < length; i++) {
          if (i == 2) {
            result = "元" + result;
          } else if (i == 6) {
            result = "万" + result;
          }
          if (m.charAt(length - i - 1) == 0) {
            if (i != 0 && i != 1) {
              if (result.charAt(0) != '零' && result.charAt(0) != '元' && result.charAt(0) != '万') {
                result = "零" + result;
              }
            }
            continue;
          }
          result = this.toDx(m.charAt(length - i - 1)) + this.unit[this.unit.length - i - 1] + result;
        }
        result += result.charAt(result.length - 1) == '元' ? "整" : "";
        this.text=result;
      },
      succer(){
//      console.log(this.formCustom.mm);
        let md5_pwd = hex_md5(this.formCustom.mm);

        let data = {
          'amount': this.formCustom.passwd + "",
          'inAccount': this.formCustom.passwdCheck,
          'tradePassword': md5_pwd
        };
//      console.log(data);
        this.turnPoint(data).then((res)=>{
//        console.log(this.turnPointList);
          if(res.code == '0'){
            this.handleReset('formCustom');
            this.$Message.success(res.msg);
          }else if(res.code == '1') {
            this.$Message.error(res.msg);
          }
        })
      },
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.succer()
          } else {
            this.$Message.error('请输入必填选项!');
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      }
    }
  }
</script>

