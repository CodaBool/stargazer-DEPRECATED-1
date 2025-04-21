'use client'
import { useEffect, useRef } from 'react'
import * as topojson from 'topojson-client'
import * as d3 from 'd3'
import topo from "@/app/data.js"
import { getColor, setLabelOpactiy } from "@/app/[map]/page"
import { LoaderCircle } from 'lucide-react'
import useScreen from '@/components/useScreen'

let touchStartTimeout = null
const scale = 400
let projection, svgGlobal
const layers = new Set(["unofficial", "guide", "background", "crosshair"])
const center = [-78, 26]

export default function WaitForScreen({ panX, panY, creator }) {
  const screen = useScreen()
  if (!screen) return (
    <div className="flex items-center justify-center mt-[40vh]">
      <LoaderCircle className="w-16 h-16 animate-spin" />
    </div>
  )
  const geojson = {
    guides: topojson.feature(topo[`${creator}Guides`], topo[`${creator}Guides`].objects.collection),
    geography: topojson.feature(topo[`${creator}Geography`], topo[`${creator}Geography`].objects.collection),
    points: topojson.feature(topo[`${creator}Points`], topo[`${creator}Points`].objects.collection),
  }
  return (
    <MiniMap
      width={screen.width}
      height={screen.height}
      panX={panX}
      panY={panY}
      geojson={geojson}
    />
  )
}

function MiniMap({ width, height, panX, panY, geojson }) {
  const svgRef = useRef(null)
  const gRef = useRef(null)
  let zoomGlobal

  useEffect(() => {
    const svg = d3.select(svgRef.current)
    const g = d3.select(gRef.current)
    svgGlobal = svg
    projection = d3.geoMercator().scale(scale).center(center).translate([width / 2, height / 2])
    const pathGenerator = d3.geoPath().projection(projection)

    svg.attr("style", "background: radial-gradient(#000A2E 0%, #000000 100%)")
    // stars
    // scale for number of pixels
    // TODO: test this on more devices / DPIs
    for (let i = 0; i < height * width / 10000; i++) {
      svg.append('circle')
        .attr('class', 'background')
        .attr('cx', Math.random() * width)
        .attr('cy', Math.random() * height)
        .attr('r', Math.random() * 2)
        .style('fill', `rgba(255, 255, 255, ${Math.random() / 3})`)
    }

    const crosshairX = svg.append('line')
      .attr('class', 'crosshair')
      .attr('x2', width)
      .attr('y1', height / 2)
      .attr('y2', height / 2)
      .attr('stroke', 'white')
      .attr('pointer-events', 'none')
      .style('visibility', 'hidden')

    const crosshairY = svg.append('line')
      .attr('class', 'crosshair')
      .attr('x1', width / 2)
      .attr('x2', width / 2)
      .attr('y2', height)
      .attr('stroke', 'white')
      .attr('pointer-events', 'none')
      .style('visibility', 'hidden')

    const coordinatesText = svg.append('text')
      .attr('class', 'coordinates-text')
      .attr('x', width / 2)
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .attr('opacity', 0.7)
      .style('font-size', '30px')
      .style('pointer-events', 'none');

    svg.on("mousemove", (e) => {
      if (!layers.has("crosshair")) return
      const [mouseX, mouseY] = d3.pointer(e)
      crosshairX.attr('y1', mouseY).attr('y2', mouseY).style('visibility', 'visible')
      crosshairY.attr('x1', mouseX).attr('x2', mouseX).style('visibility', 'visible')

      const transform = d3.zoomTransform(svg.node())
      const transformedX = (mouseX - transform.x) / transform.k;
      const transformedY = (mouseY - transform.y) / transform.k
      const [x, y] = projection.invert([transformedX, transformedY])
      coordinatesText.text(`X: ${Math.floor(x)}, Y: ${Math.floor(y)}`).style('visibility', 'visible')
    });

    svg.on("touchstart", (e) => {
      if (!layers.has("crosshair")) return
      // use a timeout since touchmove will begin with a touchstart and override
      touchStartTimeout = setTimeout(() => {
        // since the map is not taking the full screen, adjust for the parent nodes
        const rect = svg.node().getBoundingClientRect()
        const touchX = e.touches[0].clientX - rect.left
        const touchY = e.touches[0].clientY - rect.top
        crosshairX.attr('y1', touchY).attr('y2', touchY).style('visibility', 'visible')
        crosshairY.attr('x1', touchX).attr('x2', touchX).style('visibility', 'visible')
        const transform = d3.zoomTransform(svg.node());
        const transformedX = (touchX - transform.x) / transform.k;
        const transformedY = (touchY - transform.y) / transform.k;
        const [x, y] = projection.invert([transformedX, transformedY])
        coordinatesText.text(`X: ${Math.floor(x)}, Y: ${Math.floor(y)}`).style('visibility', 'visible')
      }, 80)
    })

    svg.on("touchmove", (e) => {
      if (!layers.has("crosshair")) return
      clearTimeout(touchStartTimeout)
      crosshairX.style('visibility', 'hidden')
      crosshairY.style('visibility', 'hidden')
      coordinatesText.style('visibility', 'hidden')
    })

    svg.on("mouseout", () => {
      if (!layers.has("crosshair")) return
      crosshairX.style('visibility', 'hidden')
      crosshairY.style('visibility', 'hidden')
      coordinatesText.style('visibility', 'hidden')
    })

    svg.on("mousedown", () => {
      if (!layers.has("crosshair")) return
      crosshairX.style('visibility', 'hidden');
      crosshairY.style('visibility', 'hidden')
      coordinatesText.style('visibility', 'hidden')
    })

    // Territory SVG Polygons
    g.selectAll('.group')
      .data(geojson.geography.features)
      .enter().append('path')
      .attr('class', d => d.properties.unofficial ? 'unofficial group' : 'group')
      .attr('d', pathGenerator)
      .attr('stroke-width', 3)
      .style('opacity', 1)
      .attr('fill', d => {
        return getColor(d.properties, false)
      })
      .attr('stroke', d => {
        return getColor(d.properties, true)
      })
      .on("mouseover", (e, d) => {
        d3.select(e.currentTarget).attr('fill', 'rgba(61, 150, 98, 0.5)')
        d3.select(e.currentTarget).attr('stroke', 'rgba(61, 150, 98, .7)')
      })
      .on("mouseout", (e, d) => {
        d3.select(e.currentTarget).attr('fill', getColor(d.properties, false))
        d3.select(e.currentTarget).attr('stroke', getColor(d.properties, true))
      })

    g.selectAll('.lines-label')
      .data(geojson.guides.features)
      .enter().append('text')
      .attr('class', 'lines-label guide')
      .attr('x', d => {
        const centroid = pathGenerator.centroid(d);
        const bounds = pathGenerator.bounds(d);
        const topMostPoint = bounds[0][1] < bounds[1][1] ? bounds[0] : bounds[1];
        const radius = Math.sqrt(
          Math.pow(topMostPoint[0] - centroid[0], 2) +
          Math.pow(topMostPoint[1] - centroid[1], 2)
        )
        const offsetX = 20
        return centroid[0] + offsetX + (radius / 5);
      })
      .attr('y', d => {
        const bounds = pathGenerator.bounds(d);
        const topMostPoint = bounds[0][1] < bounds[1][1] ? bounds[0] : bounds[1]
        return topMostPoint[1] + 35;
      })
      .text(d => d.properties.name)
      .style('font-size', '.7em')
      .style('fill', 'white')
      .style('pointer-events', 'none')

    g.selectAll('.lines')
      .data(geojson.guides.features)
      .enter().append('path')
      .attr('class', 'lines guide')
      .attr('d', pathGenerator)
      .style('opacity', 1)
      .attr('stroke-width', 2)
      .attr('fill', "none")
      .attr('stroke', "rgba(255, 255, 255, 0.2)")

    // Territory Labels
    g.selectAll('.group-label')
      .data(geojson.geography.features)
      .enter().append('text')
      // .attr('class', 'country-label country-layer')
      .attr('class', d => d.properties.unofficial ? 'unofficial group-label' : 'group-label')
      .attr('x', d => pathGenerator.centroid(d)[0])
      .attr('y', d => pathGenerator.centroid(d)[1])
      .attr('dy', '.35em')
      .text(d => d.properties.name)
      .style('font-size', '10px')
      .style('fill', 'white')
      .style('text-anchor', 'middle')
      .style('pointer-events', 'none')


    // Draw the points
    const gateFeature = geojson.points.features.filter(d => d.properties.type === 'gate')
    const nonGateFeature = geojson.points.features.filter(d => d.properties.type !== 'gate')

    // Draw the points
    g.selectAll('.point')
      .data(nonGateFeature)
      .enter().append('circle')
      .attr('class', d => d.properties.unofficial ? 'unofficial point' : 'point')
      .attr('r', () => 5)
      .attr('r', d => d.properties.type === 'star' ? 2 : 5)
      .attr('cx', d => projection(d.geometry.coordinates)[0])
      .attr('cy', d => projection(d.geometry.coordinates)[1])
      .attr('fill', d => d.properties.type === 'star' ? "lightgray" : "slategray")
      .attr('stroke', 'black')
      .style('opacity', 1)
      // .on("click", (e, d) => handlePointClick(e, d))
      .on("mouseover", (e, d) => {
        d3.select(e.currentTarget).attr('fill', 'rgba(61, 150, 98, 0.5)')
        d3.select(e.currentTarget).attr('stroke', 'rgba(61, 150, 98, .7)')
      })
      .on("mouseout", (e, d) => {
        d3.select(e.currentTarget).attr('fill', getColor(d.properties, false))
        d3.select(e.currentTarget).attr('stroke', getColor(d.properties, true))
      })
    g.selectAll('.point-gate')
      .data(gateFeature)
      .enter().append('rect')
      .attr('class', d => d.properties.unofficial ? 'unofficial point' : 'point')
      .attr('x', d => projection(d.geometry.coordinates)[0] - 5)
      .attr('y', d => projection(d.geometry.coordinates)[1] - 5)
      .attr('width', d => 10)
      .attr('height', d => 10)
      .attr('fill', d => 'teal')
      .attr('stroke', 'black')
      .style('opacity', 1)
      // .on("click", (e, d) => handlePointClick(e, d))
      .on("mouseover", (e, d) => {
        d3.select(e.currentTarget).attr('fill', 'rgba(61, 150, 98, 0.5)')
        d3.select(e.currentTarget).attr('stroke', 'rgba(61, 150, 98, .7)')
      })
      .on("mouseout", (e, d) => {
        d3.select(e.currentTarget).attr('fill', getColor(d.properties, false))
        d3.select(e.currentTarget).attr('stroke', getColor(d.properties, true))
      })


    // Add text labels for points
    g.selectAll('.point-label')
      .data(geojson.points.features)
      .enter().append('text')
      .attr('class', d => d.properties.unofficial ? 'unofficial point-label' : 'official point-label')
      // .attr('class', 'point-label point-layer')
      .attr('x', d => projection(d.geometry.coordinates)[0])
      .attr('y', d => {
        return d.properties.type === 'gate'
          ? projection(d.geometry.coordinates)[1] + 18
          : projection(d.geometry.coordinates)[1] + 10
      })
      .text(d => !d.properties.crowded ? d.properties.name : '')
      .style('font-size', d => d.properties.type === 'gate' ? '14px' : '6px')
      .style('font-weight', d => d.properties.type === 'gate' && 600)
      .style('text-anchor', 'middle')
      .style('fill', 'white')
      .style('opacity', 0)
      .style('pointer-events', 'none')

    // All zoom and pan events
    const zoom = d3.zoom()
      .scaleExtent([1, 8])
      .translateExtent([[-scale * 1.5, -scale * 1.5], [width + scale * 1.5, height + scale * 1.5]])
      .on('zoom', (event) => {
        g.attr('transform', event.transform)
        setLabelOpactiy(event.transform.k, gRef.current, layers)
      })
      .on("start", () => svg.style("cursor", "grabbing"))
      .on("end", () => svg.style("cursor", "grab"))

    zoomGlobal = zoom
    svg.call(zoom)


    // add a circle on the given coordinate
    const [x, y] = projection([panX, panY])
    const marker = g.append('circle')
      .attr('class', 'marker')
      .attr('cx', x)
      .attr('cy', y)
      .attr('r', 5)
      .style('fill', 'red')
      .attr('stroke', 'black')

    // Animate the marker
    const animateMarker = () => {
      marker.transition()
        .duration(1000)
        .attr('r', 7)
        .style('fill', '#FF7D7D')
        .transition()
        .duration(1000)
        .attr('r', 5)
        .style('fill', '#F4AF54')
        .on('end', animateMarker);
    }
    animateMarker()


    const transform = d3.zoomIdentity.translate(width / 2 - x * 3, height / 2 - y * 3).scale(3)
    svgGlobal.transition().duration(750).call(zoomGlobal.transform, transform)
  }, [])

  return (
    <svg ref={svgRef} width={width} height={height}>
      <g ref={gRef}></g>
    </svg>
  )
}
