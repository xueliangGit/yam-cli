import Yam, { Component } from 'yamjs'
import '../datePicker/datePicker'
import '../dataPicker/dataPicker'
@Component({
  tagName: 'my-home',
  style: require('./home.stylus'),
  shadow: true
})
class Home extends Yam {
  $data () {
    return {
      date: '',
      showzg: false
    }
  }
  showDete () {
    this.showzg = !this.showzg
    this.$refs.datePicker.show()
  }
  showDeta () {
    this.$refs.dataPicker.show()
  }
  change (str) {
    console.log(str)
    this.date = str
  }
  dataChange (obj) {
    console.log(obj)
    if (obj.colum <= 2) {
      this.$refs.dataPicker.setData(obj.colum + 1, this.getRandomData())
    }
  }
  getRandomData () {
    let l = parseInt(Math.random() * 500) + 500
    let b = parseInt(Math.random() * 500)
    let la = []
    console.log(b, l)
    for (let index = b; index < l; index++) {
      la.push(index)
    }
    return la
  }
  $mounted () {
    this.$refs.dataPicker.init([[1, 2, 3, 4, 5], [21, 21, 33, 44, 55, 66, 77, 88], [1, 2, 3, 4, 5], [3, 33, 4, 4, 4, 4, 4, 4, 4, 4, 4, 44]])
  }
  andOther () {
    return <div>
      <p>与vue结合</p>
      <iframe style='width: 100vw;height:50vh' scrolling='no' title='yamjs and vue' src='//codepen.io/xueliang/embed/PrzVOj/?height=265&theme-id=0&default-tab=js,result' frameborder='no' allowtransparency='true' allowfullscreen='true' />
      <p>与reactjs结合</p>
      <iframe style='width: 100vw;height:50vh' scrolling='no' title='yamjs and react' src='//codepen.io/xueliang/embed/wLzERM/?height=265&theme-id=0&default-tab=html,result' frameborder='no' allowtransparency='true' allowfullscreen='true'>
  See the Pen <a href='https://codepen.io/xueliang/pen/wLzERM/'>yamjs and react</a> by Xuxueliang
  (<a href='https://codepen.io/xueliang'>@xueliang</a>) on <a href='https://codepen.io'>CodePen</a>.
      </iframe>
    </div>
  }
  render () {
    return (
      <div>
        <img src='http://192.168.2.154:2521/img?text=YAM-JS&shape=circle&bg=48904e&color=fff' />
        欢迎
        <div className='mt30' onClick={this.showDete.bind(this)}>点击我唤起日期选择</div>
        <p className='fs-12 c888'>选择一个日期</p>
        <div className='' onClick={this.showDeta.bind(this)}>点击我唤起数据拾起器</div>
        <p className='fs-12 c888'>每选择一个随机显示下一列数据</p>
        <p >{this.date}</p>
        <date-picker showzg={this.showzg} change={this.change.bind(this)} ref='datePicker' />
        <data-picker change={this.change.bind(this)} dataChange={this.dataChange.bind(this)} ref='dataPicker' />
        {this.andOther()}
      </div>
    )
  }
}
export default Home
