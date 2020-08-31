 function init() {
  d3.json("samples.json").then(function(data)
{   console.log(data)

    var tagList= data.names;
    console.log(tagList)

    var selectTag=d3.select("#selDataset")
    tagList.forEach(tag=>{
        
        selectTag.append("option").attr("value",tag).text(tag)
    })

    var idTag="940";
    var fullList =data.samples;
        console.log(fullList)


    var flist=fullList.filter(item=> item.id==idTag)
        console.log(flist)

    var otuId=flist.map(item=> item.otu_ids)[0]
        console.log(otuId)

    var tranOtuId= otuId.map(item=> ` Otu ${item}`)
        console.log(tranOtuId[1])

    var sampV=flist.map(item=> item.sample_values)[0]
        console.log(sampV)

    var otulab=flist.map(item=> item.otu_labels)[0]
        console.log(otulab)

    var otuDict =[]

        for(var i=0; i<sampV.length; i++){
            otuDict.push({Otu_Id:tranOtuId[i],
            sample_value: sampV[i], otuLabel: otulab[i], otu_id_num:otuId[i]}) 
        }
    var sortedOtu = otuDict.sort((a, b) => 
        b.sample_value - a.sample_value)

    var slicedOtu = sortedOtu.slice(0, 10)
    revOtu=slicedOtu.reverse()

    var trace1={
        x:revOtu.map(item=>item.sample_value),
        y:revOtu.map(item=>item.Otu_Id),
        type:"bar", 
        orientation: "h",
        hovertext:revOtu.map(item=>item.otuLabel)
    };
    var data1 = [trace1];

    var layout1={ tiltle: "Body Otu Diversity", 
                xaxis:{tiltle: "Otu Level"},
                yaxis:{tiltle: "Otu Type"}

    };

    Plotly.newPlot("bar", data1, layout1);
        console.log(otuDict)
    var trace2 = {
    
    
        x: otuDict.map(ot=>ot.otu_id_num),
        y: otuDict.map(ot=>ot.sample_value),
        text:otuDict.map(ot=>ot.otuLabel),
        mode: 'markers',
        marker: {
          color: otuDict.map(ot=>ot.otu_id_num),
          size:otuDict.map(ot=>ot.sample_value)
        }
      };
      
    var data2 = [trace2];
      
      var layout2 = {
        title: 'Otu Distribution',
        showlegend: false,
        xaxis:{title:"OTU ID"}
       
      };
      
    Plotly.newPlot('bubble', data2, layout2);

    var demoList =data.metadata;
        console.log(demoList)

    var dlist=demoList.filter(item=> item.id==idTag)
    var metaO=dlist[0]

    var metaDiv=d3.select("#sample-metadata")
    var ultag=metaDiv.append("ul")
        ultag.append("li").text(`id: ${metaO.id}`)
        ultag.append("li").text(`ethnicity: ${metaO.ethnicity}`)
        ultag.append("li").text(`gender: ${metaO.gender}`)
        ultag.append("li").text(`age: ${metaO.age}`)
        ultag.append("li").text(`location: ${metaO.location}`)
        ultag.append("li").text(`bbtype: ${metaO.bbtype}`)
        ultag.append("li").text(`wfreq: ${metaO.wfreq}`)

        }); };
init()

d3.select("#selDataset").on("change", updatePlotly)


function updatePlotly(){
    d3.json("../samples.json").then(function(data){
        var ddmenu =d3.select("#selDataset");
        console.log(ddmenu)
        var options = ddmenu.property("value");
        console.log(options)


        var demoList =data.metadata;
        console.log(demoList)

        var dlist=demoList.filter(item=> item.id==options)
        
        var metaO=dlist[0]
        console.log(dlist)
        var metaDiv=d3.select("#sample-metadata")
        metaDiv.html(" ")
        var ultag=metaDiv.append("ul")
            ultag.append("li").text(`id: ${metaO.id}`)
            ultag.append("li").text(`ethnicity: ${metaO.ethnicity}`)
            ultag.append("li").text(`gender: ${metaO.gender}`)
            ultag.append("li").text(`age: ${metaO.age}`)
            ultag.append("li").text(`location: ${metaO.location}`)
            ultag.append("li").text(`bbtype: ${metaO.bbtype}`)
            ultag.append("li").text(`wfreq: ${metaO.wfreq}`)

            var fullList =data.samples;
            console.log(fullList)
    
    
        var flist=fullList.filter(item=> item.id==options)
            console.log(flist)
    
        var otuId=flist.map(item=> item.otu_ids)[0]
            console.log(otuId)
    
        var tranOtuId= otuId.map(item=> ` Otu ${item}`)
            console.log(tranOtuId[1])
    
        var sampV=flist.map(item=> item.sample_values)[0]
            console.log(sampV)
    
        var otulab=flist.map(item=> item.otu_labels)[0]
            console.log(otulab)
    
        var otuDict =[]
    
            for(var i=0; i<sampV.length; i++){
                otuDict.push({Otu_Id:tranOtuId[i],
                sample_value: sampV[i], otuLabel: otulab[i], otu_id_num:otuId[i]}) 
            }
        var sortedOtu = otuDict.sort((a, b) => 
            b.sample_value - a.sample_value)
    
        var slicedOtu = sortedOtu.slice(0, 10)
        revOtu=slicedOtu.reverse()
    
        var trace1={
            x:revOtu.map(item=>item.sample_value),
            y:revOtu.map(item=>item.Otu_Id),
            type:"bar", 
            orientation: "h",
            hovertext:revOtu.map(item=>item.otuLabel)
        }
        var data1 = [trace1];
    
        var layout={ tiltle: "Body Otu Diversity", 
                    xaxis:{tiltle: "Otu Level"},
                    yaxis:{tiltle: "Otu Type"}
    
        }
    
        Plotly.newPlot("bar", data1, layout)
            console.log(otuDict)
        var trace2 = {
        
        
            x: otuDict.map(ot=>ot.otu_id_num),
            y: otuDict.map(ot=>ot.sample_value),
            text:otuDict.map(ot=>ot.otuLabel),
            mode: 'markers',
            marker: {
              color: otuDict.map(ot=>ot.otu_id_num),
              size:otuDict.map(ot=>ot.sample_value)
            }
          };
          
        var data2 = [trace2];
          
          var layout2 = {
            title: 'Otu Distribution',
            showlegend: false,
            xaxis:{title:"OTU ID"}
           
          };
          
        Plotly.newPlot('bubble', data2, layout2);
    





    });


};