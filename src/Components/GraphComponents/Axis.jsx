import { lab } from "d3";
import { useEffect, useState, useMemo } from "react"
function Axis({scale, labelArray, direction, sizings}){
    const TICK_LENGTH = 6;
    const range = scale.range();
    const labelPadding = 60;
    const linePadding = 5;



    const ticks = useMemo(() => {
        const width = range[1] - range[0];
        const numberOfTicksTarget = labelArray.length; //?? Math.floor(width / pixelsPerTick);
        // const numberOfTicksTarget = Math.floor(width / pixelsPerTick);
        return scale.ticks(numberOfTicksTarget).map((value) => ({
            position : value,
          value : labelArray[value],
          offset: scale(value),
        }));
      }, [scale]);

        console.log(range)
        console.log(JSON.stringify(ticks))

        if(direction == "y"){
            return (
            <>
                <path
                d={["M", sizings.marginLeft, 0, "L", sizings.marginLeft, sizings.height-sizings.marginBottom].join(" ")}
                fill="none"
                stroke="currentColor"
            />

                {ticks.map(({ value, offset }) => (
                        <g key={value} transform={`translate(0,${offset})`}>
                            <text
                                key={value}
                                style={{
                                fontSize: "12px",
                                textAnchor: "end",
                                transform: `translate(${sizings.marginLeft-TICK_LENGTH-2}px,3px)`,
                                }}
                            >
                                {value}
                            </text>
                            <line x1={sizings.marginLeft-TICK_LENGTH} x2={sizings.marginLeft} stroke="currentColor" />
                        </g>
                ))}
            </>
            )
        }
        else{
            return (
                <>
                <g transform={`translate(${sizings.marginLeft},${sizings.height - sizings.marginBottom})`}>
                    <path
                    d={["M", 0,0, "L", sizings.width-sizings.marginLeft, 0].join(" ")}
                    fill="none"
                    stroke="currentColor"
                />
    
                    {ticks.map(({ value, offset }) => (
                            <g key={value} y1={sizings.height - sizings.marginBottom} transform={`translate(${offset},0)`}>
                                <text
                                    key={value}
                                    style={{
                                    fontSize: "20",
                                    textAnchor: "middle",
                                    transform: `translate(0px,${TICK_LENGTH+20}px)`,
                                    }}
                                >
                                    {value}
                                </text>
                                <line y1={0} y2={TICK_LENGTH} stroke="currentColor" />
                            </g>
                    ))}
                    </g>
                </>
                )
        }
}

export default Axis