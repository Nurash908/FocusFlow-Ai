import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { motion } from 'motion/react';
import { CalendarDays } from 'lucide-react';

export const FocusHeatmap: React.FC = () => {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        const data = Array.from({ length: 7 * 24 }, (_, i) => ({
            day: Math.floor(i / 24),
            hour: i % 24,
            value: Math.random() * 100
        }));

        const width = 600;
        const height = 300;
        const margin = { top: 20, right: 0, bottom: 30, left: 30 };

        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        const x = d3.scaleBand().domain(d3.range(24).map(String)).range([margin.left, width - margin.right]).padding(0.1);
        const y = d3.scaleBand().domain(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']).range([margin.top, height - margin.bottom]).padding(0.1);
        const color = d3.scaleSequential(d3.interpolate(d3.rgb('#1e1b4b'), d3.rgb('#818cf8'))).domain([0, 100]);

        svg.append('g')
            .attr('transform', `translate(0, ${height - margin.bottom})`)
            .call(d3.axisBottom(x).tickValues(d3.range(0, 24, 4).map(String)))
            .selectAll('text')
            .style('fill', '#94a3b8');

        svg.append('g')
            .attr('transform', `translate(${margin.left}, 0)`)
            .call(d3.axisLeft(y))
            .selectAll('text')
            .style('fill', '#94a3b8');

        svg.selectAll('path, line')
            .style('stroke', '#334155');

        svg.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('x', d => x(String(d.hour))!)
            .attr('y', d => y(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d.day])!)
            .attr('width', x.bandwidth())
            .attr('height', y.bandwidth())
            .attr('fill', d => color(d.value))
            .attr('rx', 4)
            .on('mouseover', function(event, d) {
                d3.select(this).attr('stroke', 'white').attr('stroke-width', 2);
            })
            .on('mouseout', function() {
                d3.select(this).attr('stroke', 'none');
            });

    }, []);

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900/90 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 shadow-[0_20px_50px_-12px_rgba(79,70,229,0.3)]"
        >
            <h3 className="font-bold text-xl mb-6 flex items-center gap-3 text-white tracking-tight">
                <div className="p-2 bg-indigo-500/20 rounded-xl ring-1 ring-indigo-500/30">
                    <CalendarDays className="text-indigo-400" size={20} />
                </div>
                Focus Heatmap
            </h3>
            <svg ref={svgRef} width="600" height="300" className="w-full h-auto" />
        </motion.div>
    );
};
