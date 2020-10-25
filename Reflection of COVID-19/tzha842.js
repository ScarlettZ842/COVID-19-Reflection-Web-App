function addHeaderInfo(){
    let url="https://api.thevirustracker.com/free-api?countryTimeline=NZ";
    try{
        const linedatapromise = fetch(url,{headers:{"Accept": "application/json",},});
        const datapromise = linedatapromise.then((response) => {return response.json()});
        datapromise.then((details)=> {
            const TIFContainer = document.getElementById("pluginto");
            const CIFContainer = document.getElementById("caseinfo")
            const datavalues = Object.values(details);
            //console.log(datavalues)
            const div = document.createElement("div");
            div.setAttribute("id", "linedateformat");
            let time = Object.keys(datavalues[1][0])[Object.keys(datavalues[1][0]).length-2];
            //console.log(datavalues[1][0])
            div.innerHTML = "<p><span style='font-weight:bold; font-size:25px;'>Last Updated</span></p>"+" "+"<span style='font-weight:bold; font-size:27px;'>"+time+"  NZST</span>";
            TIFContainer.appendChild(div);

            Object.values(datavalues[0][0]).forEach(val => {
                //console.log(val)
                const div = document.createElement("div");
                div.setAttribute("id", "titleformat");
                div.innerHTML = "<span style='font-weight:bold;'>Visit</span> <a href='"+val.source+"'>https://thevirustracker.com/new-zealand-coronavirus-information-nz </a>";
                TIFContainer.appendChild(div);
            });

            let updateitem=datavalues[1][0][time];
            const div2 = document.createElement("div");
            div2.setAttribute("id", "caseformata");
            div2.innerHTML = "<p><span style='font-size:18px;'>Total Cases<br></span>"+"<span style='font-size:35px; margin-left:-3%'>&#128106; "+updateitem.total_cases+"</span></p>";
            CIFContainer.appendChild(div2);

            const div3 = document.createElement("div");
            div3.setAttribute("id", "caseformatb");
            div3.innerHTML = "<p><span style='font-size:18px;'>Recovered Cases<br></span>"+"<span style='font-size:35px; margin-left:1%'>&#128100; "+updateitem.total_recoveries+"</span></p>";
            CIFContainer.appendChild(div3);

            const div4 = document.createElement("div");
            div4.setAttribute("id", "caseformatc");
            div4.innerHTML = "<p><span style='font-size:18px;'>New Cases Today<br></span>"+"<span style='font-size:35px; margin-left:3%'>&#128138; "+updateitem.new_daily_cases+"</span></p>";
            CIFContainer.appendChild(div4);

            const div5 = document.createElement("div");
            div5.setAttribute("id", "caseformatd");
            div5.innerHTML = "<p><span style='font-size:18px;'>Deaths Cases<br></span>"+"<span style='font-size:35px; margin-left:2%'>&#128420; "+updateitem.total_deaths+"</span></p>";
            CIFContainer.appendChild(div5);

            const div6 = document.createElement("div");
            div6.setAttribute("id", "caseformate");
            div6.innerHTML = "<p><span style='font-size:18px;'>New Deaths Today<br></span>"+"<span style='font-size:35px; margin-left:5%'>&#128148; "+updateitem.new_daily_deaths+"</span></p>";
            CIFContainer.appendChild(div6);

            let serious = updateitem.total_cases - updateitem.total_recoveries - updateitem.total_deaths;
            const divnew = document.createElement("div");
            divnew.setAttribute("id", "caseformatf");
            divnew.innerHTML = "<p><span style='font-size:18px;'>Serious Cases<br></span>"+"<span style='font-size:35px; margin-left:-3%'>&#128137; "+serious+"</span></p>";
            CIFContainer.appendChild(divnew);

        });
    }catch(error){
        console.log(error);
    }
}

function drawsecondgraph(){
    let url="https://api.thevirustracker.com/free-api?countryTimeline=NZ";
    try{
        const fetchpromise = fetch(url,{headers:{"Accept":"application/json"},});
        const arraypromise = fetchpromise.then((response)=>response.json())
        .then(function(datasets){
            const svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg1.setAttribute("id", "svggraph");
            svg1.setAttribute("width", "1310");
            svg1.setAttribute("height", "320");
            const arrayContainer1 = document.getElementById("graphinfo1");

            const symbolSVG= document.createElementNS("http://www.w3.org/2000/svg", "symbol");
            symbolSVG.setAttribute("id","symbolsvg");
            symbolSVG.setAttribute("width","2.5");
            symbolSVG.setAttribute("height","10.0");

            const rectangle = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rectangle.setAttribute("x", "0");
            rectangle.setAttribute("y", "0");
            rectangle.setAttribute("width", "2.5");
            rectangle.setAttribute("height", "10");
            rectangle.setAttribute("fill", "lightsteelblue");
            symbolSVG.appendChild(rectangle);

            const clip = document.createElementNS("http://www.w3.org/2000/svg", "clipPath");
            clip.setAttribute("id","cutoff");

            const rectangle2 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rectangle2.setAttribute("id", "disappear");
            rectangle2.setAttribute("x", "0");
            rectangle2.setAttribute("y", "0");
            rectangle2.setAttribute("width",  "2.5");
            rectangle2.setAttribute("height", "10.0");
            rectangle2.setAttribute("fill", "black");
            rectangle2.setAttribute("stroke", "black");
            clip.appendChild(rectangle2);

            svg1.appendChild(symbolSVG);
            svg1.appendChild(clip);


            const symbolSVGrecover= document.createElementNS("http://www.w3.org/2000/svg", "symbol");
            symbolSVGrecover.setAttribute("id","symbolsvgrecover");
            symbolSVGrecover.setAttribute("width","2.5");
            symbolSVGrecover.setAttribute("height","10.0");

            const rectanglerecover = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rectanglerecover.setAttribute("x", "0");
            rectanglerecover.setAttribute("y", "0");
            rectanglerecover.setAttribute("width", "2.5");
            rectanglerecover.setAttribute("height", "10");
            rectanglerecover.setAttribute("fill", "green");
            symbolSVGrecover.appendChild(rectanglerecover);

            const cliprecover = document.createElementNS("http://www.w3.org/2000/svg", "clipPath");
            cliprecover.setAttribute("id","cutdown");

            const rectangle2recover = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rectangle2recover.setAttribute("id", "disappearrec");
            rectangle2recover.setAttribute("x", "0");
            rectangle2recover.setAttribute("y", "0");
            rectangle2recover.setAttribute("width",  "2.5");
            rectangle2recover.setAttribute("height", "10.0");
            rectangle2recover.setAttribute("fill", "lightsteelblue");
            rectangle2recover.setAttribute("stroke", "none");
            cliprecover.appendChild(rectangle2recover);

            svg1.appendChild(symbolSVGrecover);
            svg1.appendChild(cliprecover);

            const rectangle3 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rectangle3.setAttribute("x", "5");
            rectangle3.setAttribute("y", "5");
            rectangle3.setAttribute("width",  "960");
            rectangle3.setAttribute("height", "300");
            rectangle3.setAttribute("fill", "black");
            svg1.appendChild(rectangle3);

            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute("font-size",13);
            text.setAttribute("fill","white");
            text.setAttribute("font-weight","bold");
            text.setAttribute("text-anchor", "middle");
            text.setAttribute("transform", "translate(10, 145) rotate(90)");
            let textNode = document.createTextNode("values");
            text.appendChild(textNode);
            svg1.appendChild(text);

            const circle1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle1.setAttribute("cx", "280");
            circle1.setAttribute("cy", "292");
            circle1.setAttribute("r", "4");
            circle1.setAttribute("stroke-width", "1.0");
            circle1.setAttribute("stroke", "lightsteelblue");
            circle1.setAttribute("fill","lightsteelblue");
            svg1.appendChild(circle1);

            const text1 = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text1.setAttribute("font-size",13);
            text1.setAttribute("fill","lightsteelblue");
            text1.setAttribute("font-weight","bold");
            text1.setAttribute("text-anchor", "middle");
            text1.setAttribute("x","330");
            text1.setAttribute("y","295");
            let textNode1 = document.createTextNode("totoal cases");
            text1.appendChild(textNode1);
            svg1.appendChild(text1);

            const circlerecover = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circlerecover.setAttribute("cx", "590");
            circlerecover.setAttribute("cy", "292");
            circlerecover.setAttribute("r", "4");
            circlerecover.setAttribute("stroke-width", "1.0");
            circlerecover.setAttribute("stroke", "green");
            circlerecover.setAttribute("fill","green");
            svg1.appendChild(circlerecover);

            const text2 = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text2.setAttribute("font-size",13);
            text2.setAttribute("fill","green");
            text2.setAttribute("font-weight","bold");
            text2.setAttribute("text-anchor", "middle");
            text2.setAttribute("x","650");
            text2.setAttribute("y","295");
            let textNode2 = document.createTextNode("recovered cases");
            text2.appendChild(textNode2);
            svg1.appendChild(text2);


            const detailvalues = Object.values(Object.values(datasets)[1][0]);
            const detailkeys = Object.keys(Object.values(datasets)[1][0]);
            //console.log(detailvalues);
            const xcoordinate = 60;
            const ycoordinate = 230;
            for (let step = detailvalues.length-180 ; step<detailvalues.length-1; step++){
                let space = 0+(step-(detailvalues.length-180))*4;
                if(space > detailvalues.length-185 && space < detailvalues.length-1){
                  let datatime = detailkeys[space];
                  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
                  text.setAttribute("font-size",10);
                  text.setAttribute("fill","white");
                  text.setAttribute("font-weight","bold");
                  text.setAttribute("text-anchor", "middle");
                  text.setAttribute("transform", "translate("+((xcoordinate-140)+5*space)+"," + (ycoordinate+35) + ") rotate(-60)")
                  let textNode = document.createTextNode(datatime);
                  text.appendChild(textNode);
                  svg1.appendChild(text);
                }

                let distance = 0+(step-(detailvalues.length-180))*500;
                if(distance <= 2000){
                  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
                  text.setAttribute("font-size",13);
                  text.setAttribute("fill","white");
                  text.setAttribute("font-weight","bold");
                  text.setAttribute("x",xcoordinate-40);
                  text.setAttribute("y",ycoordinate+15-50*(step-(detailvalues.length-180)));
                  let textNode = document.createTextNode(distance);
                  text.appendChild(textNode);
                  svg1.appendChild(text);

                  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                  line.setAttribute("x1",xcoordinate-10);
                  line.setAttribute("y1",ycoordinate+10-50*(step-(detailvalues.length-180)));
                  line.setAttribute("x2",xcoordinate-10+900);
                  line.setAttribute("y2",ycoordinate+10-50*(step-(detailvalues.length-180)));
                  line.setAttribute("stroke","gray");
                  line.setAttribute("stroke-width","1");
                  svg1.appendChild(line);
                }

                let datanumint = parseInt(detailvalues[step].total_cases/100);
                let drawdatanumint = datanumint+1;
                let datanumdec = detailvalues[step].total_cases-datanumint*100;
                let drawdatanumdec = parseInt((100-datanumdec)/10);
                //console.log(detailkeys[step], detailvalues[step].total_cases/100)
                //console.log(drawdatanumint)
                const foo = Array.from(Array(drawdatanumint).keys());

                let datanumint2 = parseInt(detailvalues[step].total_recoveries/100);
                let drawdatanumint2 = datanumint2+1;
                let datanumdec2 = detailvalues[step].total_recoveries-datanumint2*100;
                let drawdatanumdec2 = parseInt((100-datanumdec2)/10);

                const foorecover = Array.from(Array(drawdatanumint2).keys());

                for (let i = 0; i<foo.length; i++) {
                    const useSVG = document.createElementNS("http://www.w3.org/2000/svg", "use");
                    useSVG.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href","#symbolsvg");
                    useSVG.setAttribute('x',xcoordinate+(step-(detailvalues.length-180))*5);
                    useSVG.setAttribute('y',ycoordinate-10*i);
                    svg1.appendChild(useSVG);
                }

                for (let j =0; j<foorecover.length; j++) {
                    const useSVGrecover = document.createElementNS("http://www.w3.org/2000/svg", "use");
                    useSVGrecover.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href","#symbolsvgrecover");
                    useSVGrecover.setAttribute('x',xcoordinate+(step-(detailvalues.length-180))*5);
                    useSVGrecover.setAttribute('y',ycoordinate-10*j);
                    svg1.appendChild(useSVGrecover);
                }

                const xcoordinate2 = 60;
                const ycoordinate2 = ycoordinate-10*(foo.length);
                const useSVG2 = document.createElementNS("http://www.w3.org/2000/svg", "use");
                useSVG2.setAttribute("clip-path", "url(#cutoff)");
                useSVG2.setAttribute("href", "#disappear");
                useSVG2.setAttribute("fill", "black");
                useSVG2.setAttribute('x',xcoordinate2+(step-(detailvalues.length-180))*5);
                useSVG2.setAttribute('y',ycoordinate2+1*drawdatanumdec);
                svg1.appendChild(useSVG2);

                const xcoordinaterec = 60;
                const ycoordinaterec = ycoordinate-10*(foorecover.length);
                const useSVG2recover = document.createElementNS("http://www.w3.org/2000/svg", "use");
                useSVG2recover.setAttribute("clip-path", "url(#cutdown)");
                useSVG2recover.setAttribute("href", "#disappearrec");
                useSVG2recover.setAttribute("fill", "lightsteelblue");

                if (step<=129){
                    //console.log(parseInt((detailvalues.length-1)*2/3))
                    useSVG2recover.setAttribute('x',xcoordinaterec+(step-(detailvalues.length-180))*5);
                    useSVG2recover.setAttribute('y',ycoordinaterec+1*drawdatanumdec2);
                }else{
                    useSVG2recover.setAttribute('x',xcoordinaterec+(step-(detailvalues.length-180))*5);
                    useSVG2recover.setAttribute('y',ycoordinaterec+5.5+1*drawdatanumdec2);
                }
                svg1.appendChild(useSVG2recover);
                //Math.round((detailvalues.length-1)*2/3)-(detailvalues.length-197)
                console.log(svg1)

            }

            arrayContainer1.appendChild(svg1);
        });
    }catch(error){
        console.log(error);
    }
}

function drawfirstgraph(){
    let url="https://api.thevirustracker.com/free-api?countryTimeline=NZ";
    try{
        const graphfetchpromise = fetch(url,{headers:{"Accept":"application/json"},});
        const graphpromise = graphfetchpromise.then((response)=>response.json())
        .then(function(graphsets){
            const svg2 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg2.setAttribute("id", "svggraph");
            svg2.setAttribute("width", "1310");
            svg2.setAttribute("height", "280");
            const arrayContainer2 = document.getElementById("graphinfo2");

            const rectangledeath = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rectangledeath.setAttribute("x", "5");
            rectangledeath.setAttribute("y", "5");
            rectangledeath.setAttribute("width",  "960");
            rectangledeath.setAttribute("height", "250");
            rectangledeath.setAttribute("fill", "black");
            svg2.appendChild(rectangledeath);

            const texttwo = document.createElementNS("http://www.w3.org/2000/svg", "text");
            texttwo.setAttribute("font-size",13);
            texttwo.setAttribute("fill","white");
            texttwo.setAttribute("font-weight","bold");
            texttwo.setAttribute("text-anchor", "middle");
            texttwo.setAttribute("transform", "translate(10, 130) rotate(90)");
            let textNode = document.createTextNode("values");
            texttwo.appendChild(textNode);
            svg2.appendChild(texttwo);

            const graphvalues = Object.values(Object.values(graphsets)[1][0]);
            const graphkeys = Object.keys(Object.values(graphsets)[1][0]);
            const xcoordinatedeath = 60;
            const ycoordinatedeath = 200;

            for (let num = graphvalues.length-180 ; num<graphvalues.length-2; num++){
                //console.log(graphvalues[num].total_deaths);

                let interval = 0+(num-(graphvalues.length-180))*10;
                if(interval > graphvalues.length-187 && interval < graphvalues.length-1){
                  let datadeathtime = graphkeys[interval];
                  const deathtext = document.createElementNS("http://www.w3.org/2000/svg", "text");
                  deathtext.setAttribute("font-size",10);
                  deathtext.setAttribute("fill","white");
                  deathtext.setAttribute("font-weight","bold");
                  deathtext.setAttribute("text-anchor", "middle");
                  deathtext.setAttribute("transform", "translate("+((xcoordinatedeath-45)+4.5*interval)+"," + (ycoordinatedeath+35) + ") rotate(-60)")
                  let textNode = document.createTextNode(datadeathtime);
                  deathtext.appendChild(textNode);
                  svg2.appendChild(deathtext);
                }

                let gap = 0+(num-(graphvalues.length-180))*5;
                if(gap <= 30){
                  const textnew = document.createElementNS("http://www.w3.org/2000/svg", "text");
                  textnew.setAttribute("font-size",13);
                  textnew.setAttribute("fill","white");
                  textnew.setAttribute("font-weight","bold");
                  textnew.setAttribute("x",xcoordinatedeath-30);
                  textnew.setAttribute("y",ycoordinatedeath+15-30*(num-(graphvalues.length-180)));
                  let textNode = document.createTextNode(gap);
                  textnew.appendChild(textNode);
                  svg2.appendChild(textnew);

                  const deathline = document.createElementNS("http://www.w3.org/2000/svg", "line");
                  deathline.setAttribute("x1",xcoordinatedeath-10);
                  deathline.setAttribute("y1",ycoordinatedeath+10-30*(num-(graphvalues.length-180)));
                  deathline.setAttribute("x2",xcoordinatedeath-10+900);
                  deathline.setAttribute("y2",ycoordinatedeath+10-30*(num-(graphvalues.length-180)));
                  deathline.setAttribute("stroke","gray");
                  deathline.setAttribute("stroke-width","1");
                  svg2.appendChild(deathline);
                }

                const linedeath = document.createElementNS("http://www.w3.org/2000/svg", "line");
                linedeath.setAttribute("x1",xcoordinatedeath+(num-(graphvalues.length-180))*5);
                linedeath.setAttribute("y1",ycoordinatedeath+10-graphvalues[num].total_deaths*6);
                linedeath.setAttribute("x2",xcoordinatedeath+(num+1-(graphvalues.length-180))*5);
                linedeath.setAttribute("y2",ycoordinatedeath+10-graphvalues[num+1].total_deaths*6);
                linedeath.setAttribute("stroke","red");
                linedeath.setAttribute("stroke-width","5");
                linedeath.setAttribute("stroke-linecap","round");
                svg2.appendChild(linedeath);

            }
            arrayContainer2.appendChild(svg2);
        });


    }catch(error){
        console.log(error);
    }
}

function showalldata(){
    let url="https://api.thevirustracker.com/free-api?countryTimeline=NZ";
    try{
        const allfetchpromise = fetch(url,{headers:{"Accept":"application/json"},});
        const allpromise = allfetchpromise.then((response)=>response.json())
        .then(function(statistic){
            const alldataContainer = document.getElementById("databoxstas");
            const alldatavalues = Object.values(Object.values(statistic)[1][0]);
            const alldatakeys = Object.keys(Object.values(statistic)[1][0]);
            for (let item = alldatavalues.length-2 ; item>=0; item--){
                const div = document.createElement("div");
                div.setAttribute("id", "alldataformat");
                div.innerHTML = "<p style='text-align:center;'>"+alldatakeys[item]+"<br><br>total_cases: "+alldatavalues[item].total_cases+"<br>"
                +"new_daily_cases: "+alldatavalues[item].new_daily_cases+"<br>"
                +"new_daily_deaths: "+alldatavalues[item].new_daily_deaths+"<br>"
                +"total_deaths: "+alldatavalues[item].total_deaths+"<br>"
                +"total_recoveries: "+alldatavalues[item].total_recoveries+"</span><br><p><br><hr><br>"
                alldataContainer.appendChild(div);
            }
        })

    }catch(error){
        console.log(error);
    }
}


window.onload = () =>{
    addHeaderInfo();
    drawsecondgraph();
    drawfirstgraph();
    showalldata();
}
