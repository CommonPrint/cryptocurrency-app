import { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import { CryptoToken } from 'types';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faReddit,
  faGithub,
  faGoogle
} from "@fortawesome/free-brands-svg-icons";

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;


const Wrapper = styled.section`
  margin-top: 3rem;
  width: 100%;

  @media (min-width: 767px) {
    // grid-template-columns: minmax(100px, 400px) 1fr;
    align-items: top;
    // gap: 5rem;
  }
  @media (min-width: 1024px) {
    // grid-template-columns: minmax(400px, 600px) 1fr;
  }
`;

const InfoImage = styled.img`
  display: block;
  object-fit: contain;
`;

const InfoTitle = styled.h1`
  margin: 0;
  font-weight: var(--fw-normal);
  margin-left: 20px;
`;

const ListGroup = styled.div`
  display: grid;
  // flex-direction: column;
  
  grid-template-columns: 400px 400px;

  margin-top: 20px;

  gap: 2rem;

  @media (min-width: 1024px) {
    flex-direction: row;
    gap: 4rem;
  }
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  line-height: 1.5;
  word-spacing: 4px;
  & > b {
    font-weight: var(--fw-bold);
  }
`;



const SocialList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const SocialListItem = styled.li`
  padding: 5px;
  line-height: 1.5;
  word-spacing: 4px;
  & > b {
    font-weight: var(--fw-bold);
  }
`;

const Link = styled.a`
  color: #7979ff;
  text-decoration: none;
`

const StatisticList = styled.dl`
  margin: 0;
  padding: 0;
  display: grid;
  row-gap: 6px;
  margin-top: 5px;

  color: gray;
  font-size: 14px;
  font-weight: 700;
  
  align-items: center;
  grid-template-columns: 140px 100px;
`

const StaticticTerm = styled.dt`
`
const StaticticDefinition = styled.dd`
  margin: 0;
  padding: 0;
`



export const Info = (props: CryptoToken) => {

  const data = {...props}

  let socialMedia = {
    website: '',
    facebook: '',
    reddit: '',
    twitter: '',
    github: ''
  }

  let name, symbol, description, logo, subreddit, socials, price = 0, volumeChange24h = 0, percentChange24h = 0;

  function setData(key: string, value: any) {
    
    switch(key) {
      case "name":
        name = value;
        break;
      case "symbol":
        symbol = value
        break;
      case "description":
        description = value
        break;
      case "logo":
        logo = value
        break;
      case "subreddit":
        subreddit = value
        break;
      case "price":
        price = value
        break;
      case "percent_change_24h":
        percentChange24h = value
        break;
      case "volume_change_24h":
        volumeChange24h = value
        break;
      case "socials":
        socials = Object.entries(value)
        break;
    }

  }


  Object.entries(data.metadata).forEach(([k, v]) => (
    setData(k, v)
  ));

  Object.entries(data.statistics).forEach(([k, v]) => (
    setData(k, v)
  ));

  if(socials != null) {

    Object.entries(socials).forEach((elem: any) => {
      
      let key: string, value;
      
      elem[1].forEach((k: string, v: any) => {


        if(key === "website") {
          socialMedia.website = k[0]
        }
        else if(key === "twitter") {
          socialMedia.twitter = k[0]
        }
        else if(key === "facebook") {
          socialMedia.facebook = k[0]
        }
        else if(key === "reddit") {
          socialMedia.reddit = k[0]
        }
        else if(key === "source_code") {
          socialMedia.github = k[0]
        }


        if(typeof k === "string") {
          key = k;  
        }
        
      })

    });

  }

  return (
  <>
    <Wrapper>
      <Row>
        <InfoImage src={logo} width="64px" height="64px" alt={name} />
        <InfoTitle>{name}</InfoTitle>
      </Row>

      <Column>
        <ListGroup>
          <List>
            <ListItem>
                <b>Symbol:</b> {symbol}
            </ListItem>
            {
              subreddit ? <ListItem>
                <b>Subreddit:</b> {subreddit}
              </ListItem> : <br/>
            }
            <ListItem>
              <b>Description:</b> 
              <p>{description}</p>
            </ListItem>
          </List>
          <List>
            <ListItem>
              <b>Social media</b>
              <SocialList>
                {
                  socialMedia.website != null ?   
                  <SocialListItem>
                    <Link href={socialMedia.website}>
                      <FontAwesomeIcon icon={faGoogle} size="1x" />
                    </Link>
                  </SocialListItem> : <></>
                }
                {
                  socialMedia.facebook != null ?   
                  <SocialListItem>
                    <Link href={socialMedia.facebook}>
                      <FontAwesomeIcon icon={faFacebook} size="1x" />
                    </Link>
                  </SocialListItem> : <></>
                }

                
                {
                  socialMedia.twitter != null ?   
                  <SocialListItem>
                    <Link href={socialMedia.twitter}>
                      <FontAwesomeIcon icon={faTwitter} size="1x" />
                    </Link>
                  </SocialListItem> : <></>
                }
                
                
                {
                  socialMedia.reddit != null ?   
                  <SocialListItem>
                    <Link href={socialMedia.reddit}>
                      <FontAwesomeIcon icon={faReddit} size="1x" />
                    </Link>
                  </SocialListItem> : <></>
                }

                {
                  socialMedia.github != null ?   
                  <SocialListItem>
                    <Link href={socialMedia.github}>
                      <FontAwesomeIcon icon={faGithub} size="1x" />
                    </Link>
                  </SocialListItem> : <></>
                }

              </SocialList>
              {/* {
                socials
              } */}
            </ListItem>
            <ListItem>
              <b>Statistics</b> <br/>
              <StatisticList>
                <StaticticTerm>Current price:</StaticticTerm>
                <StaticticDefinition style={{"color": "blue"}}>{String(price).slice(0, 6)} $</StaticticDefinition>

                <StaticticTerm>Volume change for 24 hours:</StaticticTerm>
                <StaticticDefinition>{
                  volumeChange24h > 0 ? <span style={{"color": "#36bc36"}}>+{String(volumeChange24h).slice(0, 5)}%</span> : 
                  <span style={{"color": "#f7182d"}}>-{String(volumeChange24h).slice(0, 5)}%</span>
                }</StaticticDefinition>

                
                <StaticticTerm>Percent price change for 24 hours:</StaticticTerm>
                <StaticticDefinition>{
                  percentChange24h > 0 ? <span style={{"color": "#36bc36"}}>+{String(percentChange24h).slice(0, 5)}%</span> : 
                  <span style={{"color": "#f7182d"}}>-{String(percentChange24h).slice(0, 5)}%</span>
                }</StaticticDefinition>
              </StatisticList>

            </ListItem>
          </List>
        </ListGroup>
      </Column>
    </Wrapper>
    </>
  )
};
