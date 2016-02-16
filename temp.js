/*
   Free Code Camp - Camper News
   Author - Varenya
*/

var NewsCardHolder = React.createClass({
  getNewsData: function(){
    //console.log(this.props.url);
    var that = this;
    $.getJSON(this.props.url,function(data){
      this.setState({data:data});
    }.bind(this)
  ).fail(function() {
    console.error("Failed to fetch");
  });
},
  getInitialState : function () {
    return {data:[]};
  },

  componentDidMount: function () {
    this.getNewsData();
  },
  render: function () {
    var NewsCardRows = [];
    var temp;
    //console.log(this.state.data.length);
    for(var i = 0; i < this.state.data.length ; i+=3){
      temp = [];
      //console.log(i);
      for(var j=i ; j<i+3;j++){
        //console.log(j,this.state.data[j]);
        temp.push(this.state.data[j]);
      }
      temp = temp.filter(function (item) {
        return item !== undefined;
      })
      //console.log(temp);
      NewsCardRows.push(<NewsCardRow rowdata={temp} />);
    }
    //console.log(NewsCardRows);

    return (
      <div className="container">
        {NewsCardRows}
      </div>
    );

  }
});



var NewsCardRow = React.createClass({
  render : function(){
    //console.log(this.props.rowdata);
    var NewsCards = this.props.rowdata.map(function (news) {
      return (<NewsCard news_data = {news} />);
    });

    return (
      <div className="row post-infor">
        {NewsCards}
      </div>
    );

  }

});


var NewsCard = React.createClass({

  epochtoDate : function(epocDate){
    return new Date(epocDate).toDateString();
  },
  render : function () {
    let data = this.props.news_data;
    //console.log(data);
    return (
      <div className="col-sm-4">
        <div id="container">
          <h2><a className="headline" href={data.link} target="_blank">{data.headline}</a></h2>
          <div className="img-wrapper">
           <a href={data.link} target="_blank">
            <img src={data.author.picture} alt="Profile Pic"/>
           </a>
          </div>
          <div className="post-info text-center">
             <div className ="detail alert alert-info"> Posted By {data.author.username} </div>
             <div className ="detail alert alert-info"> Upvotes <span className="badge">{data.upVotes.length}</span></div>
             <div className ="detail alert alert-info"> Posted on {this.epochtoDate(data.timePosted)} </div>
          </div>
        </div>
      </div>
    );
  }
});

ReactDOM.render(<NewsCardHolder url="http://www.freecodecamp.com/news/hot"/>,document.getElementById('dummy'));
