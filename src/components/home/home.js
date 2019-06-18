import Yam, { Component } from 'yamjs'
import '../datePicker/datePicker'
import '../dataPicker/dataPicker'
@Component({
  tagName: 'my-home',
  style: require('./home.stylus')
})
class Home extends Yam {
  $data () {
    return {
      date: ''
    }
  }
  showDete () {
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
  render () {
    return (
      <div>
        <img src='' />
        欢迎来到YAMJS
        <div className='mt30' onClick={this.showDete.bind(this)}>点击我唤起日期选择</div>
        <p className='fs-12 c888'>选择一个日期</p>
        <div className='' onClick={this.showDeta.bind(this)}>点击我唤起数据拾起器</div>
        <p className='fs-12 c888'>每选择一个随机显示下一列数据</p>
        <p >{this.date}</p>
        <date-picker showzg change={this.change.bind(this)} ref='datePicker' />
        <data-picker change={this.change.bind(this)} dataChange={this.dataChange.bind(this)} ref='dataPicker' />
      </div>
    )
  }
}
export default Home
