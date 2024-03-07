<!-- รายชื่อบริษัทหลักทรัพย์จัดการกองทุน -->
    <script>
        $(document).ready(function () {
            // Make the API request
            $.ajax({
                url: 'https://api.sec.or.th/pvd/factsheet/amc',
                method: 'GET',
                headers: {
                    'Cache-Control': 'no-cache',
                    'Ocp-Apim-Subscription-Key': 'f0ecccb076d5441cab72c1f48998e11b'
                },
                success: function (data) {
                    // Update the table with the received data
                    var tbody = $('#dataTables tbody');
                    $.each(data, function (index, item) {
                        var row = '<tr>' +
                            '<td>' + item.unique_id + '</td>' +
                            '<td>' + item.name_th + '</td>' +
                            '<td>' + item.name_en + '</td>' +
                            '<td>' + item.abbr_name + '</td>' +
                            '<td>' + item.last_upd_date + '</td>' +
                            '</tr>';
                        tbody.append(row);
                    });
                },
                error: function (error) {
                    console.log('Error:', error);
                }
            });
        });

        $(document).ready(function () {
            // Export to Excel button click event
            $('#exportButton').on('click', function () {
                // Get the data from the table
                var table = document.getElementById('dataTables');
                var rows = table.rows;
                var data = [];

                // Iterate through rows and cells to build the data array
                for (var i = 1; i < rows.length; i++) { // Start from 1 to skip header row
                    var row = rows[i];
                    var rowData = [];
                    for (var j = 0; j < row.cells.length; j++) {
                        rowData.push(row.cells[j].innerText);
                    }
                    data.push(rowData);
                }

                // Create a worksheet
                var ws = XLSX.utils.aoa_to_sheet([['unique_id', 'name_th', 'name_en', 'abbr_name', 'last_upd_date']].concat(data));

                // Create a workbook
                var wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');

                // Generate a formatted date and time string
                var now = new Date();
                var formattedDateTime = now.toISOString().slice(0, 19).replace("T", "_").replace(/:/g, "-");

                // Append the formatted date and time to the filename
                var filename = 'PVD_list_' + formattedDateTime + '.xlsx';

                // Save to file
                XLSX.writeFile(wb, filename);
            });
        });
    </script>

    <!-- กองทุนภายใต้การบริหารจัดการของบริษัทหลักทรัพย์จัดการกองทุน -->
    <script>
        function fetchDataPVDUnder() {
            // Make the API request
            const uniqueId = $('#uniqueId').val();
            $.ajax({
                url: `https://api.sec.or.th/pvd/factsheet/${uniqueId}/fund`, // Use backticks here
                method: 'GET',
                headers: {
                    'Cache-Control': 'no-cache',
                    'Ocp-Apim-Subscription-Key': 'f0ecccb076d5441cab72c1f48998e11b'
                },
                success: function (data) {
                    // Update the table with the received data
                    var tbody = $('#dataPVDUnder tbody');
                    $.each(data, function (index, item) {
                        var row = '<tr>' +
                            '<td>' + item.proj_id + '</td>' +
                            '<td>' + item.regis_id + '</td>' +
                            '<td>' + item.regis_date + '</td>' +
                            '<td>' + item.cancel_date + '</td>' +
                            '<td>' + item.proj_name_th + '</td>' +
                            '<td>' + item.fund_type + '</td>' +
                            '<td>' + item.fund_status + '</td>' +
                            '<td>' + item.unique_id + '</td>' +
                            '<td>' + item.last_upd_date + '</td>' +
                            '</tr>';
                        tbody.append(row);
                    });
                },
                error: function (error) {
                    console.log('Error:', error);
                }
            });
        }

        $('#submitButton').on('click', fetchDataPVDUnder);


        $(document).ready(function () {
            // Export to Excel button click event
            $('#exportButtonPVDUnder').on('click', function () {
                // Get the data from the table
                var table = document.getElementById('dataPVDUnder');
                var rows = table.rows;
                var data = [];

                // Iterate through rows and cells to build the data array
                for (var i = 1; i < rows.length; i++) { // Start from 1 to skip header row
                    var row = rows[i];
                    var rowData = [];
                    for (var j = 0; j < row.cells.length; j++) {
                        rowData.push(row.cells[j].innerText);
                    }
                    data.push(rowData);
                }

                // Create a worksheet
                var ws = XLSX.utils.aoa_to_sheet([['proj_id', 'regis_id', 'regis_date', 'cancel_date', 'proj_name_th', 'fund_type', 'fund_status', 'unique_id', 'last_upd_date']].concat(data));

                // Create a workbook
                var wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');

                // Generate a formatted date and time string
                var now = new Date();
                var formattedDateTime = now.toISOString().slice(0, 19).replace("T", "_").replace(/:/g, "-");

                // Append the formatted date and time to the filename
                var filename = 'PVD_Under_' + formattedDateTime + '.xlsx';

                // Save to file
                XLSX.writeFile(wb, filename);
            });
        });
    </script>

    <!-- นโยบายการลงทุนของกองทุนสำรองเลี้ยงชีพ -->
    <script>
        function fetchDataPVDProlicy() {
            // Make the API request
            const proj_id = $('#proj_id').val();
            $.ajax({
                url: `https://api.sec.or.th/pvd/factsheet/${proj_id}/policy`, // Use backticks here
                method: 'GET',
                headers: {
                    'Cache-Control': 'no-cache',
                    'Ocp-Apim-Subscription-Key': 'f0ecccb076d5441cab72c1f48998e11b'
                },
                success: function (data) {
                    // Update the table with the received data
                    var tbody = $('#dataPVDProlicy tbody');
                    $.each(data, function (index, item) {
                        var row = '<tr>' +
                            '<td>' + item.proj_id + '</td>' +
                            '<td>' + item.policy_id + '</td>' +
                            '<td>' + item.unique_sub_policy_id + '</td>' +
                            '<td>' + item.sub_policy_id + '</td>' +
                            '<td>' + item.sub_policy_name + '</td>' +
                            '<td>' + item.sub_policy_start_date + '</td>' +
                            '<td>' + item.sub_policy_end_date + '</td>' +
                            '<td>' + item.sub_policy_nav_start + '</td>' +
                            '<td>' + item.risk_level + '</td>' +
                            '<td>' + item.foreign_risk_level + '</td>' +
                            '<td>' + item.aimc_type + '</td>' +
                            '<td>' + item.objective + '</td>' +
                            '<td>' + item.mf_invest_flag + '</td>' +
                            '<td>' + item.new_member_offer + '</td>' +
                            '<td>' + item.last_upd_date + '</td>' +
                            '</tr>';
                        tbody.append(row);
                    });
                },
                error: function (error) {
                    console.log('Error:', error);
                }
            });
        }

        $('#submitButtonPVDProlicy').on('click', fetchDataPVDProlicy);


        $(document).ready(function () {
            // Export to Excel button click event
            $('#exportButtonPVDProlicy').on('click', function () {
                // Get the data from the table
                var table = document.getElementById('dataPVDProlicy');
                var rows = table.rows;
                var data = [];

                // Iterate through rows and cells to build the data array
                for (var i = 1; i < rows.length; i++) { // Start from 1 to skip header row
                    var row = rows[i];
                    var rowData = [];
                    for (var j = 0; j < row.cells.length; j++) {
                        rowData.push(row.cells[j].innerText);
                    }
                    data.push(rowData);
                }

                // Create a worksheet
                var ws = XLSX.utils.aoa_to_sheet([[
                    'proj_id',
                    'policy_id',
                    'unique_sub_policy_id',
                    'sub_policy_id',
                    'sub_policy_name',
                    'sub_policy_start_date',
                    'sub_policy_end_date',
                    'sub_policy_nav_start',
                    'risk_level',
                    'foreign_risk_level',
                    'aimc_type',
                    'objective',
                    'mf_invest_flag',
                    'new_member_offer',
                    'last_upd_date',
                ]].concat(data));

                // Create a workbook
                var wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');

                // Generate a formatted date and time string
                var now = new Date();
                var formattedDateTime = now.toISOString().slice(0, 19).replace("T", "_").replace(/:/g, "-");

                // Append the formatted date and time to the filename
                var filename = 'PVD_Prolicy_' + formattedDateTime + '.xlsx';

                // Save to file
                XLSX.writeFile(wb, filename);
            });
        });
    </script>