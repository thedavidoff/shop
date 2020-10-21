import React from "react";
import "rc-slider/assets/index.css";

import styles from "./Sidebar.module.css";
// import Filters from "../UI/Filters/Filters";
// import Preloader from "../UI/Preloader/Preloader";
import { RefinementList } from "react-instantsearch-dom";
import Custom from "../UI/ISearch/Custom";
import FilterAccordion from "../UI/FilterAccordion/FilterAccordion";

// transformItems={(items) =>
// items.map((item) => ({
//   ...item,
//   count: `(${item.count})`,
// }))
// }

const Sidebar = () => { // { rangePrices }

  return (
    <div className={styles.sidebar}>
      {/*{rangePrices[0] >= 0 && rangePrices[1] > 0 ? (*/}
      {/*  <Filters />*/}
      {/*) : (*/}
      {/*  <Preloader type="filter" />*/}
      {/*)}*/}
      <FilterAccordion id="brand" heading="Производители">
        <Custom attribute="specifications.brand.value" />
      </FilterAccordion>
      <FilterAccordion id="chip_maker" heading="Производитель чипа">
        <RefinementList
          attribute="specifications.chip_maker.value"
          operator="or"
          limit={10}
        />
      </FilterAccordion>
      <FilterAccordion id="series" heading="Серия">
        <RefinementList
          attribute="specifications.series.value"
          operator="or"
          limit={10}
        />
      </FilterAccordion>
      <FilterAccordion id="lineup" heading="Модельный ряд">
        <RefinementList
          attribute="specifications.lineup.value"
          operator="or"
          limit={10}
        />
      </FilterAccordion>
      <FilterAccordion id="professional" heading="Профессиональная">
        <RefinementList
          attribute="specifications.professional.value"
          operator="or"
          limit={10}
        />
      </FilterAccordion>
      <FilterAccordion id="memory_size" heading="Объем памяти">
        <RefinementList
          attribute="specifications.memory_size.value"
          operator="or"
          limit={10}
        />
      </FilterAccordion>
      <FilterAccordion id="memory_type" heading="Тип памяти">
        <RefinementList
          attribute="specifications.memory_type.value"
          operator="or"
          limit={10}
        />
      </FilterAccordion>
      <FilterAccordion id="memory_bus" heading="Шина памяти">
        <RefinementList
          attribute="specifications.memory_bus.value"
          operator="or"
          limit={10}
        />
      </FilterAccordion>
      <FilterAccordion id="directX" heading="DirectX">
        <RefinementList
          attribute="specifications.directX.value"
          operator="or"
          limit={10}
        />
      </FilterAccordion>
      <FilterAccordion id="power_connectors" heading="Дополнительное питание">
        <RefinementList
          attribute="specifications.power_connectors.value"
          operator="or"
          limit={10}
        />
      </FilterAccordion>
      <FilterAccordion id="d-sub" heading="D-Sub (VGA)">
        <RefinementList
          attribute="specifications.d-sub.value"
          operator="or"
          limit={10}
        />
      </FilterAccordion>
      <FilterAccordion id="dvi" heading="DVI">
        <RefinementList
          attribute="specifications.dvi.value"
          operator="or"
          limit={10}
        />
      </FilterAccordion>
      <FilterAccordion id="hdmi" heading="HDMI">
        <RefinementList
          attribute="specifications.hdmi.value"
          operator="or"
          limit={10}
        />
      </FilterAccordion>
      <FilterAccordion id="displayPort" heading="DisplayPort">
        <RefinementList
          attribute="specifications.displayPort.value"
          operator="or"
          limit={10}
        />
      </FilterAccordion>
      <FilterAccordion id="process_technology" heading="Техпроцесс">
        <RefinementList
          attribute="specifications.process_technology.value"
          operator="or"
          limit={10}
        />
      </FilterAccordion>
      <FilterAccordion id="recommended_psu" heading="Блок питания">
        <RefinementList
          attribute="specifications.recommended_psu.value"
          operator="or"
          limit={10}
        />
      </FilterAccordion>
      <FilterAccordion id="cooling_type" heading="Тип охлаждения">
        <RefinementList
          attribute="specifications.cooling_type.value"
          operator="or"
          limit={10}
        />
      </FilterAccordion>
      <FilterAccordion id="features" heading="Особенности">
        <RefinementList
          attribute="specifications.features.value"
          operator="or"
          limit={10}
        />
      </FilterAccordion>
      <FilterAccordion id="slot_type" heading="Исполнение">
        <RefinementList
          attribute="specifications.slot_type.value"
          operator="or"
          limit={10}
        />
      </FilterAccordion>
    </div>
  );
};

// Sidebar.propTypes = {
//   rangePrices: PropTypes.array,
// };

export default Sidebar;
