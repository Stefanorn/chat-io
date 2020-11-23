import React,{} from 'react';
import xButton from '../../images/x-button.png';
import questionmarkButton from '../../images/q-button.png';
import ircIcon from '../../images/irc.png';
import './index.css';
import PropTypes from 'prop-types';

const Banner = ({header}) => (
    <div className="banner-Container">
        <img src={ircIcon} className="banner-button"></img>
        <p className="banner-text">{header}</p>
        <img src={questionmarkButton} className="banner-button first-button"></img>
        <img src={xButton} className="banner-button"></img>
    </div>
);

Banner.propTypes = {
    header : PropTypes.string
};

export default Banner;