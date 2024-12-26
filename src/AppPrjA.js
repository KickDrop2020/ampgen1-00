import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import Papa from "papaparse"; // CSVパーサー
import {
Chart as ChartJS,
CategoryScale,
LinearScale,
PointElement,
LineElement,
Title,
Tooltip,
Legend
} from "chart.js";

// 必要なスケールと要素を登録
ChartJS.register(
CategoryScale,
LinearScale,
PointElement,
LineElement,
Title,
Tooltip,
Legend
);

function AppPrjA() {
const [csvData, setCsvData] = useState(null);
const [xAxisLabel, setXAxisLabel] = useState("Time");
const [yAxisLabel, setYAxisLabel] = useState("Speed");
const [xRange, setXRange] = useState([0, 10]);
const [yRange, setYRange] = useState([0, 100]);

// CSVを読み込む
const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
    Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
        setCsvData(result.data); // データをステートに保存
        },
    });
    }
};

// グラフデータを生成
const generateGraphData = () => {
    if (!csvData) return null;

    const xData = csvData.map((row) => parseFloat(row[xAxisLabel]) || 0);
    const yData = csvData.map((row) => parseFloat(row[yAxisLabel]) || 0);

    return {
    labels: xData,
    datasets: [
        {
        label: `${yAxisLabel} vs ${xAxisLabel}`,
        data: yData,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
        },
    ],
    };
};

const graphData = generateGraphData();

return (
    <div className="AppPrjA">
    <h2>プロジェクトA</h2>
    <p>CSVファイルのデータをグラフ化</p>

    {/* CSVファイルアップロード */}
    <input type="file" accept=".csv" onChange={handleFileUpload} />

    {/* 軸の選択 */}
    {csvData && (
        <div>
        <div>
            <label>
            X軸ラベル:
            <select value={xAxisLabel} onChange={(e) => setXAxisLabel(e.target.value)}>
                {Object.keys(csvData[0]).map((label) => (
                <option key={label} value={label}>
                    {label}
                </option>
                ))}
            </select>
            </label>
        </div>
        <div>
            <label>
            Y軸ラベル:
            <select value={yAxisLabel} onChange={(e) => setYAxisLabel(e.target.value)}>
                {Object.keys(csvData[0]).map((label) => (
                <option key={label} value={label}>
                    {label}
                </option>
                ))}
            </select>
            </label>
        </div>

        {/* 表示範囲の設定 */}
        <div>
            <label>
            X軸範囲:
            <input
                type="number"
                value={xRange[0]}
                onChange={(e) => setXRange([parseFloat(e.target.value), xRange[1]])}
            />
            ~
            <input
                type="number"
                value={xRange[1]}
                onChange={(e) => setXRange([xRange[0], parseFloat(e.target.value)])}
            />
            </label>
        </div>
        <div>
            <label>
            Y軸範囲:
            <input
                type="number"
                value={yRange[0]}
                onChange={(e) => setYRange([parseFloat(e.target.value), yRange[1]])}
            />
            ~
            <input
                type="number"
                value={yRange[1]}
                onChange={(e) => setYRange([yRange[0], parseFloat(e.target.value)])}
            />
            </label>
        </div>
        </div>
    )}

    {/* グラフを5つ作成 */}
    {graphData &&
        Array.from({ length: 5 }).map((_, i) => (
        <div key={i} style={{ margin: "20px 0" }}>
            <Line
            data={graphData}
            options={{
                scales: {
                x: { min: xRange[0], max: xRange[1] },
                y: { min: yRange[0], max: yRange[1] },
                },
            }}
            />
        </div>
        ))}
    </div>
);
}

export default AppPrjA;
