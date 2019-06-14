import Yam, { Component } from 'yamjs'
import '../detePicker/datePicker'
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
  change (str) {
    console.log(str)
    this.date = str
  }
  render () {
    return (
      <div>
        <img src='' />
        欢迎来到YAM
        <div className='mt30' onClick={this.showDete.bind(this)}>点击我唤起日期选择</div>
        <p>{this.date}</p>
        <date-picker showzg change={this.change.bind(this)} ref='datePicker' />
      </div>
    )
  }
}
export default Home
