import React from "react";
import PropTypes from "prop-types";
import { GoRadioTower } from "react-icons/go";
import { AiOutlineFolderOpen } from "react-icons/ai";
import { RiShoppingBasket2Line } from "react-icons/ri";

import { BsFacebook, BsInstagram, BsYoutube, BsSpotify } from "react-icons/bs";
import { SiTiktok } from "react-icons/si";
import { FaGoodreads, FaPodcast } from "react-icons/fa";
import { RiSoundcloudFill } from "react-icons/ri";

import Image from "components/Image";

import home_main_logo from "assets/images/home-main-logo.png";
import "./styles.scss";
import image_author from "assets/images/image_author.png";

const HomePage = (props) => {
    return (
        <div className="home-page">
            <section className="home-header">
                <div className="header-content">
                    <div className="left">
                        <img src={home_main_logo} alt="Nha Cua Di" />
                    </div>
                    <div className="middle">
                        <div className="page-title">Nhà của Di</div>
                        <div className="author">Diệu Nguyễn</div>
                    </div>
                    <div className="right">
                        <div className="read-blog">
                            <AiOutlineFolderOpen className="icon" />
                            Read Di's blog
                        </div>
                        <div className="listen-radio">
                            <GoRadioTower className="icon" /> Listen Di's radio
                        </div>
                        <div className="shopping-with-author">
                            <RiShoppingBasket2Line className="icon" /> Shopping with Di
                        </div>
                    </div>
                </div>
            </section>
            <section className="home-other-links">
                <BsFacebook className="icon" size={38} />
                <BsInstagram className="icon" size={38} />
                <SiTiktok className="icon" size={38} />
                <BsYoutube className="icon" size={38} />
                <FaGoodreads className="icon" size={38} />
                <BsSpotify className="icon" size={38} />
                <FaPodcast className="icon" size={38} />
                <RiSoundcloudFill className="icon" size={38} />
            </section>
            <section className="home-introduction">
                <div className="author-image">
                    <img src={image_author} alt="Image Author" />
                </div>
                <div className="author-info">
                    <div className="title">
                        Who is Diệu Nguyễn?
                        <div>-------------------------------------</div>
                    </div>
                    <p>Xin chào, mình là Nguyễn Thị Ngọc Diệu, hay được gọi ngắn gọn là Di.</p>

                    <p>Mình là người Sài Gòn đang sống ở Sài Gòn.</p>

                    <p>
                        Hiện tại, mình là Giảng viên ĐH Khoa học Tự nhiên – ĐH Quốc Gia thành phố Hồ
                        Chí Minh.
                    </p>

                    <div className="title">
                        What does Di's house have?
                        <div>-------------------------------------</div>
                    </div>

                    <p>Ở Nhà của Di, mình sẽ chia sẻ các nội dung sau:</p>

                    <p>1. Kinh nghiệm học tập – làm việc.</p>
                    <p>2. Trải nghiệm sống và những bài học đúc kết.</p>
                    <p>3. Review sách chân thật và chất lượng Kiến thức tuy ngắn nhưng bổ ích.</p>

                    <p>Trên các nền tảng:</p>
                    <p>1. Đọc – Blog.</p>
                    <p>2. Nghe không hình – Radio (Podcast).</p>
                    <p>3. Vừa nghe vừa xem – TikTok và Youtube.</p>
                </div>
            </section>
            <section className="home-experiences"></section>
        </div>
    );
};

HomePage.propTypes = {};

export default HomePage;
