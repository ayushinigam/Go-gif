import React from "react";
import renderer from "react-test-renderer";
import Gif from "./index";

describe(("Gif"), () => {
    const imageData = {
        moving: { height: 10, width: 10, url: "test/moving" },
        still: { height: 10, width: 10, url: "test/still" },
    };
    it("renders correctly", () => {
        const tree = renderer.create(<Gif imageData={imageData} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
