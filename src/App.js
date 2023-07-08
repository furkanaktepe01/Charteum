import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Utils } from "alchemy-sdk";

import Navbar from "./components/Navbar";
import Chart from "./components/Chart";
import { useEffect, useState } from "react";
import { alchemy } from "./config.js";

const App = () => {

  const range = "0xA";

  const erc20Contract = {
    name: "Tether",
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    decimals: 6
  }

  const transferEventSignature = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";

  const [oldestBlock, setOldestBlock] = useState();
  const [transferVolumes, setTransferVolumes] = useState([]);
  const [baseFees, setBaseFees] = useState([]);
  const [gasUsedRatios, setGasUsedRatios] = useState([]);
  
  useEffect(() => {
      
    fetchData();

    alchemy.ws.on("block", async () => await fetchData());  console.log(transferVolumes)
    
  }, []);

  const fetchData = async () => {

    try {

      const { oldestBlock, baseFeePerGas, gasUsedRatio } = await alchemy.core.send("eth_feeHistory", [range, "latest", []]);

      setOldestBlock(oldestBlock);

      setTransferVolumes(await getTransferVolumes(oldestBlock));

      setBaseFees(baseFeePerGas.slice(0, -1).map((hex)=> Utils.formatEther(parseInt(hex))));

      setGasUsedRatios(gasUsedRatio.map((g) => parseFloat(g.toFixed(4)))); 

    } catch (e) {
      console.log(e);
    } 
  }

  const getTransferVolumes = async (oldestBlock) => {

    let transferVolumes = [];

    for (let i = 0; i < parseInt(range); i++) {
      
      transferVolumes[i] = await getTransferVolumeByBlock("0x"+(parseInt(oldestBlock) + i).toString(16));
    }

    return transferVolumes;
  }

  const getTransferVolumeByBlock = async (block) => {

    const logs = await alchemy.core.getLogs({
      fromBlock: block,
      toBlock: block,
      address: erc20Contract.address,
      topics: [ transferEventSignature ],
    });                                

    const valueWithDecimals = logs.map((e) => parseInt(e.data)).reduce((s, n) => s + n, 0).toString();

    return valueWithDecimals.length > erc20Contract.decimals ? parseInt(valueWithDecimals.slice(0, -1 * erc20Contract.decimals)) : 0;
  }

  const dataify = (name, state) => {

    return Array(parseInt(range)).fill(null).map((v, i) => { return { block: oldestBlock + i, [name]: state[i] } });
  }

  return (
    <div>
      <Navbar/>
      <Container>
        <Routes>
          <Route exact path="/" element={<Chart dataKey="Tether Transfer Volume" data={ dataify("Tether Transfer Volume", transferVolumes) } color="#00C914" />} />
          <Route path="/erc20-transfer-volume" element={<Chart dataKey="Tether Transfer Volume" data={ dataify("Tether Transfer Volume", transferVolumes) }  color="#00C914" />} />
          <Route path="/base-fee-per-gas" element={<Chart dataKey="Base Fee" data={ dataify("Base Fee", baseFees) } color="#2347BD" />} />
          <Route path="/gas-used-ratio" element={<Chart dataKey="Gas Used Ratio" data={ dataify("Gas Used Ratio", gasUsedRatios) } color="#B30600" />} />
        </Routes>
      </Container>
      <br/><br/><br/>
    </div>
  );
}

export default App;
