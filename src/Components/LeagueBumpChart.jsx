import { useEffect, useState, useRef } from "react"
import Axis from "./GraphComponents/Axis.jsx"


import * as d3 from "d3";

function LeagueBumpChart({teams}){
    //const [teams,SetTeams] = useState(teamsParam)
    const [sizings,setSizings] = useState({
        width: 1000,
        height: 750,
        marginTop: 20,
        marginRight: 20,
        marginBottom: 30,
        marginLeft: 80
    })
    const ref = useRef();
    console.log(teams);
    
    const seq = (start, length) => Array.apply(null, {length: length}).map((d, i) => i + start);


        const weeks = ["1","2","3","4","5","6","7","8","9","10","11","12"];


        //const width = seasons.length * 80
        const maxWeeks = 12;
        const height = teams.length * 90
        const margin = ({left: 105, right: 105, top: 20, bottom: 50})
        const padding = 25

        // const y = d3.scalePoint()  
        //     .range([margin.top, height - margin.bottom - padding]);
        
        
        // const bx = d3.scalePoint()
        //     .domain(seq(0, seasons.length))
        //     .range([0, width - margin.left - margin.right - padding * 2])

        const yScale = d3.scaleLinear().domain([0, teams.length-1]).range([10, sizings.height-sizings.marginBottom-25]);
        const xScale = d3.scaleLinear().domain([0, maxWeeks-1]).range([10, sizings.width]);
        //const
        

        //let leftAxis = d3.scalePoint().domain(teams).tickValues(teams);
            // .domain(teams)
            // .range(0,teams.length);


        // let scale = d3.scaleLinear().domain([margin.top, teams.length]).range([0, height]);
        // console.log(height)

        // let axis = d3.axisBottom(scale); 
        // const drawAxis = (g, x, y, axis, domain) => {
        //         g.attr("transform", `translate(${x},${y})`)
        //           .call(axis)
        //           .selectAll(".tick text")
        //           .attr("font-size", "12px");
                
        //         if (!domain) g.select(".domain").remove();
        //       }
        
        // // Select the svg element and set its width and height
        // const graph = d3
        //   .select("svg")
        //   .attr("width", "100%")
        //   .attr("height", "100%")
        //   .attr("cursor", "default");

        

        // graph.append("g")
        // .attr("transform", `translate(${margin.left + padding},0)`)
        // .selectAll("path")
        // .data(seq(0, seasons.length))
        // .join("path")
        // .attr("stroke", "#ccc")
        // .attr("stroke-width", 2)
        // .attr("stroke-dasharray", "5,5")
        // .attr("d", d => d3.line()([[bx(d), 0], [bx(d), height - margin.bottom]]));

        // graph.append("g")
        //       .selectAll('text')
        //       .data(teams) 
        //       .join('text')
        //       .attr('y', function(d,i){
        //         return scale(i);
        //       })
        //       .text(function(d){
        //         return d;
        //       })
            // .attr("transform", `translate(${margin.bottom + padding},0)`)
            
    return (
        <svg width = {sizings.width} height={sizings.height} ref = {ref}>
          <Axis scale={yScale} labelArray={teams} direction={"y"} sizings={sizings}></Axis>
          <Axis scale={xScale} labelArray={weeks} direction={"x"} sizings={sizings}></Axis>
        </svg>
    )

}

export default LeagueBumpChart