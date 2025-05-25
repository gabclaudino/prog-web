$(document).ready(function () {
  $.getJSON('grade.json', function (grade) {
    montarGrade(grade);
  });
});

function montarGrade(grade) {
  const $theadRow = $('#header-row');
  const $tbody = $('#grade tbody');

  $theadRow.empty();
  $tbody.empty();

  const periodos = Object.keys(grade).sort((a, b) => a - b);
  const maxLinhas = Math.max(...periodos.map(p => grade[p].length));

  // Monta os cabeçalhos
  periodos.forEach(p => {
    $theadRow.append(`<th>${p}º Período</th>`);
  });

  // Monta as linhas de disciplinas
  for (let i = 0; i < maxLinhas; i++) {
    const $tr = $('<tr></tr>');

    periodos.forEach(p => {
      const disciplina = grade[p][i];
      if (disciplina) {
        $tr.append(`
          <td class="disciplina nao-cursado" data-codigo="${disciplina.codigo}">
            ${disciplina.nome}
          </td>
        `);
      } else {
        $tr.append('<td></td>');
      }
    });

    $tbody.append($tr);
  }
}

function carregarHistoricoAluno(ra) {
    $.ajax({
        url: 'alunos.xml',
        dataType: 'xml',
        success: function (data) {
            const historico = [];

            $(data).find('ALUNO').each(function () {
                const raAluno = $(this).find('MATR_ALUNO').text();
                if (raAluno === ra) {
                    historico.push({
                        cod: $(this).find('COD_ATIV_CURRIC').text(),
                        nome: $(this).find('NOME_ATIV_CURRIC').text(),
                        ano: $(this).find('ANO').text(),
                        periodo: $(this).find('PERIODO').text(),
                        nota: $(this).find('MEDIA_FINAL').text(),
                        freq: $(this).find('FREQUENCIA').text(),
                        situacao: $(this).find('SITUACAO').text()
                    });
                }
            });

            aplicarSituacoesNaGrade(historico);
        }
    });
}

function aplicarSituacoesNaGrade(historico) {
    historico.forEach(disc => {
        const cell = $(`td[data-codigo='${disc.cod}']`);
        if (cell.length) {
            let cor;

            switch (disc.situacao.toLowerCase()) {
                case 'aprovado':
                    cor = 'lightgreen';
                    break;
                case 'reprovado':
                    cor = 'lightcoral';
                    break;
                case 'matricula':
                    cor = 'lightblue';
                    break;
                case 'equivale':
                    cor = 'khaki';
                    break;
                case 'repr. Freq':
                    cor = 'lightcoral';
                    break;
                default:
                    cor = 'white';
            }

            cell.css('background-color', cor);
            cell.data('info', disc); // guarda para usar no popup
        }
    });
}

$(document).ready(function () {
    $('#buscarRA').on('click', function () {
        const numeroRA = $('#raInput').val().trim();
        if (numeroRA.length === 8 && /^\d+$/.test(numeroRA)) {
            const raCompleto = 'GRR' + numeroRA;
            carregarHistoricoAluno(raCompleto);
        } else {
            alert('Por favor, insira um RA numérico de 8 dígitos.');
        }
    });

    $('#grade').on('click', 'td', function (e) {
        const info = $(this).data('info');
        if (info) {
            alert(`Código: ${info.cod}\nNome: ${info.nome}\nAno: ${info.ano} - ${info.periodo}\nNota: ${info.nota}\nFrequência: ${info.freq}%`);
        }
    });

    $('#grade').on('contextmenu', 'td', function (e) {
        e.preventDefault();
        const cod = $(this).data('codigo');
        if (!cod) return;

        $.ajax({
            url: 'alunos.xml',
            dataType: 'xml',
            success: function (data) {
                let historico = '';
                const numeroRA = $('#raInput').val().trim();
                const ra = 'GRR' + numeroRA;
                $(data).find('ALUNO').each(function () {
                    const raAluno = $(this).find('MATR_ALUNO').text();
                    const codDisc = $(this).find('COD_ATIV_CURRIC').text();
                    if (raAluno === ra && codDisc === cod) {
                        const ano = $(this).find('ANO').text();
                        const periodo = $(this).find('PERIODO').text();
                        const nota = $(this).find('MEDIA_FINAL').text();
                        const freq = $(this).find('FREQUENCIA').text();
                        historico += `Ano: ${ano} (${periodo}) - Nota: ${nota} - Freq: ${freq}%\n`;
                    }
                });

                alert(`Histórico da disciplina ${cod}:\n${historico}`);
            }
        });
    });
});





