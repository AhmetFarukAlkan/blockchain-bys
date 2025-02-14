import React from 'react'
import ContentLoader from 'react-content-loader'

const Catalog = props => (
    <ContentLoader height={330} width={1360} speed={2} {...props}>
        <rect x="30" y="20" rx="8" ry="8" width="200" height="200"/>
        <rect x="30" y="250" rx="0" ry="0" width="200" height="18"/>
        <rect x="30" y="275" rx="0" ry="0" width="120" height="20"/>
        <rect x="250" y="20" rx="8" ry="8" width="200" height="200"/>
        <rect x="250" y="250" rx="0" ry="0" width="200" height="18"/>
        <rect x="250" y="275" rx="0" ry="0" width="120" height="20"/>
        <rect x="470" y="20" rx="8" ry="8" width="200" height="200"/>
        <rect x="470" y="250" rx="0" ry="0" width="200" height="18"/>
        <rect x="470" y="275" rx="0" ry="0" width="120" height="20"/>
        <rect x="690" y="20" rx="8" ry="8" width="200" height="200"/>
        <rect x="690" y="250" rx="0" ry="0" width="200" height="18"/>
        <rect x="690" y="275" rx="0" ry="0" width="120" height="20"/>
        <rect x="910" y="20" rx="8" ry="8" width="200" height="200"/>
        <rect x="910" y="250" rx="0" ry="0" width="200" height="18"/>
        <rect x="910" y="275" rx="0" ry="0" width="120" height="20"/>
        <rect x="1130" y="20" rx="8" ry="8" width="200" height="200"/>
        <rect x="1130" y="250" rx="0" ry="0" width="200" height="18"/>
        <rect x="1130" y="275" rx="0" ry="0" width="120" height="20"/>
    </ContentLoader>
)
export default Catalog
