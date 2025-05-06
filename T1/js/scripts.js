window.onload = () => {
    const canvas = document.getElementById('canvas-container');
    const ctx = canvas.getContext('2d');
    const resetBtn = document.getElementById("reset-btn");
    const generateBtn = document.getElementById("generate-btn");
    const input = document.getElementById("inputDefault");
    const linesNumberSpan = document.getElementById("lines-number")
  
    canvas.width = 800;
    canvas.height = 600;
  
    let lines = [];
    
    lines.push({x1: 200, y1: 300, x2: 600, y2: 300});

    let selectedLine = null;
    let dragMode = null; 
    let dragging = false;
    let offset = { x: 0, y: 0 };
    
    function updateLinesCount() {
        linesNumberSpan.textContent = `Retas: ${lines.length}`;
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        lines.forEach((line) => { 
        
            ctx.lineWidth = 4;
            ctx.strokeStyle = '#8a8a8a'
            ctx.beginPath();
            ctx.moveTo(line.x1, line.y1);
            ctx.lineTo(line.x2, line.y2);
            ctx.stroke();

            ctx.fillStyle = '#000000';
            ctx.beginPath();
            ctx.arc(line.x1, line.y1, 6, 0, Math.PI * 2);
            ctx.fill();

            ctx.beginPath();
            ctx.arc(line.x2, line.y2, 6, 0, Math.PI * 2);
            ctx.fill();
        });
        updateLinesCount();
    }

    function getClickedLineRegion(mx, my) {
        for (let i = lines.length - 1; i >= 0; i--) {
            const line = lines[i];
            const dist1 = Math.hypot(mx - line.x1, my - line.y1);
            const dist2 = Math.hypot(mx - line.x2, my - line.y2);
      
            if (dist1 < 10) 
                return { line, region: 'p1' };
            if (dist2 < 10) 
                return { line, region: 'p2' };
            if (isMouseNearLine(mx, my, line)) 
                return { line, region: 'line' };
        }
      
        return null;
      }
      
      

    function isMouseNearLine(mx, my, line) {
        const { x1, y1, x2, y2 } = line;
        const A = mx - x1;
        const B = my - y1;
        const C = x2 - x1;
        const D = y2 - y1;
      
        const dot = A * C + B * D;
        const len_sq = C * C + D * D;
        const param = len_sq ? dot / len_sq : -1;
      
        let xx, yy;
        if (param < 0) {
            xx = x1;
            yy = y1;
        } else if (param > 1) {
            xx = x2;
            yy = y2;
        } else {
            xx = x1 + param * C;
            yy = y1 + param * D;
        }
      
        const dx = mx - xx;
        const dy = my - yy;
        return Math.sqrt(dx * dx + dy * dy) < 10;
    }
      
  
    canvas.addEventListener('mousedown', (e) => {
        if(e.button !== 0) return;

        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
      
        const result = getClickedLineRegion(mx, my);
      
        if (result) {
            dragging = true;
            selectedLine = result.line;
            dragMode = result.region;
            offset.x = mx;
            offset.y = my;
        }
    });
      
      
  
    canvas.addEventListener('mousemove', (e) => {
        if(e.button !== 0) return;

        if (!dragging || !selectedLine) return;
      
        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
      
        const dx = mx - offset.x;
        const dy = my - offset.y;
      
        if (dragMode === 'line') {
            selectedLine.x1 += dx;
            selectedLine.y1 += dy;
            selectedLine.x2 += dx;
            selectedLine.y2 += dy;
        } else if (dragMode === 'p1') {
            selectedLine.x1 += dx;
            selectedLine.y1 += dy;
        } else if (dragMode === 'p2') {
            selectedLine.x2 += dx;
            selectedLine.y2 += dy;
        }
      
        offset.x = mx;
        offset.y = my;
      
        draw();
    });
  
    canvas.addEventListener('mouseup', () => {
        dragging = false;
        dragMode = null;
        selectedLine = null;
    });


    canvas.addEventListener('contextmenu', (e) => {
        e.preventDefault();
      
        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
      
        const result = getClickedLineRegion(mx, my);
      
        if (result && result.region === 'line') {
          const original = result.line;
      
          const { x2, y2 } = original;
      
          original.x2 = mx;
          original.y2 = my;
      
          lines.push({
            x1: mx,
            y1: my,
            x2: x2,
            y2: y2
          });
      
          draw();
        }
    });

    function resetLines(){
        lines.length = 0;
        lines.push({x1: 200, y1: 300, x2: 600, y2: 300});
    }

    resetBtn.addEventListener("click", () => {
        resetLines();
        draw();
    });

    generateBtn.addEventListener("click", () => {
        let value = input.value;
        if(value <= 2 || value >= 9 )
        {
            alert("Por favor insira valores entre 3 e 8");
        }

        else if(value == 3)
        {
            lines.length = 0;
            lines.push({x1: 400, y1: 200, x2: 320, y2: 366});
            lines.push({x1: 320, y1: 366, x2: 480, y2: 366});
            lines.push({x1: 480, y1: 366, x2: 400, y2: 200});
            
        }

        else if(value == 4) {
            lines.length = 0;
            lines.push({x1: 250, y1: 150, x2: 550, y2: 150});
            lines.push({x1: 550, y1: 150, x2: 550, y2: 450});
            lines.push({x1: 550, y1: 450, x2: 250, y2: 450});
            lines.push({x1: 250, y1: 450, x2: 250, y2: 150});
        }

        else if(value == 5) {
            lines.length = 0;
            lines.push({x1: 400, y1: 150, x2: 530, y2: 230});
            lines.push({x1: 530, y1: 230, x2: 470, y2: 380});
            lines.push({x1: 470, y1: 380, x2: 330, y2: 380});
            lines.push({x1: 330, y1: 380, x2: 270, y2: 230});
            lines.push({x1: 270, y1: 230, x2: 400, y2: 150});
        }

        else if(value == 6) {
            lines.length = 0;
            lines.push({x1: 400, y1: 150, x2: 525, y2: 225});
            lines.push({x1: 525, y1: 225, x2: 525, y2: 375});
            lines.push({x1: 525, y1: 375, x2: 400, y2: 450});
            lines.push({x1: 400, y1: 450, x2: 275, y2: 375});
            lines.push({x1: 275, y1: 375, x2: 275, y2: 225});
            lines.push({x1: 275, y1: 225, x2: 400, y2: 150});
        }

        else if(value == 7) {
            lines.length = 0;
            lines.push({x1: 600, y1: 300, x2: 525, y2: 456});
            lines.push({x1: 525, y1: 456, x2: 355, y2: 495});
            lines.push({x1: 355, y1: 495, x2: 220, y2: 387});
            lines.push({x1: 220, y1: 387, x2: 220, y2: 213});
            lines.push({x1: 220, y1: 213, x2: 355, y2: 105});
            lines.push({x1: 355, y1: 105, x2: 525, y2: 144});
            lines.push({x1: 525, y1: 144, x2: 600, y2: 300});
        }
        
        

        else if(value == 8) {
            lines.length = 0;
            lines.push({x1: 400, y1: 500, x2: 259, y2: 441});
            lines.push({x1: 259, y1: 441, x2: 200, y2: 300});
            lines.push({x1: 200, y1: 300, x2: 259, y2: 159});
            lines.push({x1: 259, y1: 159, x2: 400, y2: 100});
            lines.push({x1: 400, y1: 100, x2: 541, y2: 159});
            lines.push({x1: 541, y1: 159, x2: 600, y2: 300});
            lines.push({x1: 600, y1: 300, x2: 541, y2: 441});
            lines.push({x1: 541, y1: 441, x2: 400, y2: 500});
        }
        
        input.value = "";
        draw();
    });

    draw();
};
  